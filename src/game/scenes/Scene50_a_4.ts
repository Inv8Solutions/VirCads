import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50_a_4 extends Scene {
    constructor() {
        super('Scene50_a_4');
    }

    create() {
        if (this.textures.exists('scene_50_a_1')) {
            const bg = this.add.image(800, 450, 'scene_50_a_1');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // VirTips overlay (white rounded panel with blue header, thumbnail, text, bullets, close)
        const panelW = 920;
        const panelH = 540;
        const panelX = 800;
        const panelY = 460;
        const cornerR = 16;
        const panelG = this.add.graphics().setDepth(200);
        const panelX0 = panelX - panelW / 2;
        const panelY0 = panelY - panelH / 2;
        panelG.fillStyle(0xffffff, 1);
        panelG.fillRoundedRect(panelX0, panelY0, panelW, panelH, cornerR);
        panelG.lineStyle(4, 0x000000, 1);
        panelG.strokeRoundedRect(panelX0, panelY0, panelW, panelH, cornerR);

        const headerH = 72;
        const headerG = this.add.graphics().setDepth(201);
        headerG.fillStyle(0x2f8ae6, 1);
        headerG.fillRoundedRect(panelX0, panelY0, panelW, headerH, cornerR);
        headerG.lineStyle(2, 0x000000, 1);
        headerG.strokeRoundedRect(panelX0, panelY0, panelW, headerH, cornerR);

        // Avatar (left) — use 'lab_tech' if available
        const avatarSize = 44;
        let avatar: Phaser.GameObjects.Image | null = null;
        let avatarMaskG: Phaser.GameObjects.Graphics | null = null;
        let avatarBg: Phaser.GameObjects.Arc | null = null;
        if (this.textures.exists('lab_tech')) {
            avatar = this.add.image(panelX0 + 20 + avatarSize / 2, panelY0 + headerH / 2, 'lab_tech')
                .setDepth(202)
                .setDisplaySize(avatarSize, avatarSize)
                .setInteractive({ useHandCursor: true });

            // create a circular geometry mask so the avatar appears round
            // use add.graphics() to satisfy typings (make.graphics add option isn't in TS defs)
            avatarMaskG = this.add.graphics();
            avatarMaskG.fillStyle(0xffffff, 1);
            avatarMaskG.fillCircle(panelX0 + 20 + avatarSize / 2, panelY0 + headerH / 2, avatarSize / 2);
            const mask = avatarMaskG.createGeometryMask();
            avatar.setMask(mask);
        } else {
            avatarBg = this.add.circle(panelX0 + 20 + avatarSize / 2, panelY0 + headerH / 2, avatarSize / 2, 0xffffff).setDepth(202).setStrokeStyle(2, 0x000000);
        }

        // Title
        const title = this.add.text(panelX0 + 24 + avatarSize + 12, panelY0 + headerH/2, 'VirTips', { fontSize: '28px', color: '#000', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0, 0.5).setDepth(202);

        // Predeclare overlay elements so handlers can reference them without use-before-define
        let thumb: Phaser.GameObjects.Image | null = null;
        let thumbBg: Phaser.GameObjects.Graphics | null = null;
        const bodyLines: Phaser.GameObjects.Text[] = [];
        const bulletText: Phaser.GameObjects.Text[] = [];
        let footer: Phaser.GameObjects.Text | null = null;

        // Close X (top-right of panel)
        const closeX = this.add.text(panelX0 + panelW - 28, panelY0 + headerH/2, '✕', { fontSize: '28px', color: '#000' }).setOrigin(0.5).setDepth(202);
        const closeHit = this.add.rectangle(panelX0 + panelW - 28, panelY0 + headerH / 2, 56, 56, 0xffffff, 0).setDepth(203).setInteractive({ useHandCursor: true });
        closeHit.on('pointerdown', () => {
            panelG.destroy(); headerG.destroy(); title.destroy(); closeX.destroy(); closeHit.destroy();
            if (avatar) { avatar.clearMask(true); avatar.destroy(); }
            if (avatarMaskG) { avatarMaskG.destroy(); }
            if (avatarBg) { avatarBg.destroy(); }
            if (thumb) thumb.destroy(); if (thumbBg) thumbBg.destroy(); if (bodyLines) bodyLines.forEach(t => t.destroy()); if (bulletText) bulletText.forEach(t => t.destroy()); if (footer) footer.destroy();
            EventBus.emit('current-scene-ready', this);
            this.scene.start('Scene50_a_5');
        });

        // Left thumbnail (use 'scene_46' if a specific thumb isn't available)
        const thumbW = 160;
        const thumbH = 160;
        const thumbX = panelX0 + 28 + thumbW/2;
        const thumbY = panelY0 + headerH + 26 + thumbH/2;
        if (this.textures.exists('abrasion_image')) {
            thumb = this.add.image(thumbX, thumbY, 'abrasion_image').setDisplaySize(thumbW, thumbH).setDepth(202);
        } else if (this.textures.exists('scene_46')) {
            thumb = this.add.image(thumbX, thumbY, 'scene_46').setDisplaySize(thumbW, thumbH).setDepth(202);
        } else {
            thumbBg = this.add.graphics().setDepth(202);
            thumbBg.fillStyle(0xdddddd, 1);
            thumbBg.fillRect(thumbX - thumbW/2, thumbY - thumbH/2, thumbW, thumbH);
            thumbBg.lineStyle(2, 0x000000, 1);
            thumbBg.strokeRect(thumbX - thumbW/2, thumbY - thumbH/2, thumbW, thumbH);
        }

        // Body text to the right of thumbnail
        const bodyX = panelX0 + 28 + thumbW + 24;
        let bodyY = panelY0 + headerH + 20;
        const lineOpts = { fontSize: '18px', color: '#000', fontFamily: 'Arial', wordWrap: { width: panelW - (bodyX - panelX0) - 32 } } as any;
        const heading = this.add.text(bodyX, bodyY, 'An abrasion (graze) is a superficial injury involving the outer layers of the skin, without penetration of the full thickness of the epidermis.', lineOpts).setOrigin(0, 0).setDepth(202);
        bodyLines.push(heading);
        bodyY += heading.height + 12;

        const para = this.add.text(bodyX, bodyY, 'The appearance of an abrasion may indicate the exact point of contact and help determine the direction of impact', lineOpts).setOrigin(0, 0).setDepth(202);
        bodyLines.push(para);
        bodyY += para.height + 12;

        // Bulleted list
        const bullets = [
            'Scratches - linear abrasions (e.g., fingernails)',
            'Scuff (brush) abrasions – very superficial grazing injuries',
            'Point or gouge abrasions – deeper linear abrasions caused by pointed objects (e.g., metal nails)',
            'Crush abrasions – seen in bite marks and the grooved, parchment-like abrasions in hanging'
        ];
        bullets.forEach((b, i) => {
            const t = this.add.text(bodyX, bodyY, `• ${b}`, { fontSize: '16px', color: '#000', fontFamily: 'Arial', wordWrap: { width: panelW - (bodyX - panelX0) - 32 } }).setOrigin(0, 0).setDepth(202);
            bulletText.push(t);
            bodyY += t.height + 6;
        });

        // Footer citation small
        footer = this.add.text(panelX, panelY0 + panelH - 14, "Simpson's Forensic Medicine 15th edition by Payne-James, Jones, Karch, & Man love: Chapter 8; Assessment, Classification, Documentation of Injury (Page 83)", { fontSize: '12px', color: '#222', fontFamily: 'Arial', align: 'center', wordWrap: { width: panelW - 32 } }).setOrigin(0.5, 1).setDepth(202);

        EventBus.emit('current-scene-ready', this);
    }
}
