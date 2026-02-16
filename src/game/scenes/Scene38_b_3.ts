import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_3 extends Scene {
    constructor() {
        super('scene38_b_3');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // Semi-transparent overlay
        const overlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.4).setDepth(900);

        // Modal panel
        const panelW = 1200;
        const panelH = 700;
        const panelX = 800;
        const panelY = 450;

        const panelBg = this.add.rectangle(panelX, panelY, panelW, panelH, 0xffffff, 1).setDepth(901);
        panelBg.setStrokeStyle(6, 0x000000, 1);

        // Header bar
        const headerH = 72;
        const header = this.add.rectangle(panelX, panelY - panelH/2 + headerH/2, panelW, headerH, 0x2f9ef4, 1).setDepth(902);
        header.setStrokeStyle(2, 0x000000, 0.6);

        // Avatar (use lab_tech if available)
        const avatar = this.add.image(panelX - panelW/2 + 48, panelY - panelH/2 + headerH/2, 'lab_tech')
            .setDepth(903)
            .setDisplaySize(48, 48)
            .setOrigin(0.5, 0.5);

        // Title
        this.add.text(panelX - panelW/2 + 110, panelY - panelH/2 + headerH/2, 'VirTips', { fontSize: '28px', color: '#000000', fontStyle: 'bold' })
            .setOrigin(0, 0.5).setDepth(903);

        // X button (but will go to next scene instead of closing)
        const xBtn = this.add.text(panelX + panelW/2 - 40, panelY - panelH/2 + headerH/2, '✕', { fontSize: '28px', color: '#000000' })
            .setOrigin(0.5, 0.5).setDepth(903)
            .setInteractive({ useHandCursor: true });
        xBtn.on('pointerdown', () => {
            this.scene.start('scene38_b_4');
        });

        // Left: 2x2 image grid
        const thumbW = 160;
        const thumbH = 120;
        const thumbsX = panelX - panelW/2 + 160;
        const thumbsY = panelY - panelH/2 + 140;
        const thumbSpacingX = 180;
        const thumbSpacingY = 140;

        const thumbAssets = ['contusion_stage1', 'contusion_stage2', 'contusion_stage3', 'contusion_stage4'];
        for (let r = 0; r < 2; r++) {
            for (let c = 0; c < 2; c++) {
                const idx = r * 2 + c;
                const tx = thumbsX + c * thumbSpacingX;
                const ty = thumbsY + r * thumbSpacingY;
                const asset = thumbAssets[idx] || 'scene_35';
                const img = this.add.image(tx, ty, asset).setDepth(904);
                img.setDisplaySize(thumbW, thumbH);
            }
        }

        // Right: info box (purple border)
        const infoX = panelX + 30;
        const infoY = panelY - panelH/2 + 140;
        const infoW = 540;
        const infoH = 220;
        const infoBg = this.add.rectangle(infoX + infoW/2, infoY + infoH/2, infoW, infoH, 0xffffff, 1).setDepth(904);
        infoBg.setStrokeStyle(2, 0x8a2be2, 1);

        const infoText = 'A contusion is the effusion of blood into tissues beneath the skin caused by rupture of blood vessels due to blunt force or violence.';
        this.add.text(infoX + 12, infoY + 12, infoText, { fontSize: '18px', color: '#000000', wordWrap: { width: infoW - 24 } })
            .setOrigin(0, 0).setDepth(905);

        // Lower content: bullets
        const bulletsY = panelY - panelH/2 + 400;
        const bulletsX = panelX - panelW/2 + 40;
        const bullets = [
            'Red to purple – immediately after injury',
            'Green – around 4–5 days',
            'Yellow – around 7–10 days',
            'Fades/disappears – by 14–15 days (may persist up to 1–4 weeks)'
        ];
        for (let i = 0; i < bullets.length; i++) {
            this.add.text(bulletsX, bulletsY + i * 32, `• ${bullets[i]}`, { fontSize: '16px', color: '#000000' }).setDepth(905);
        }

        // Make whole panel ignore pointer events behind it
        panelBg.setInteractive();
        header.setInteractive();

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_3 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
