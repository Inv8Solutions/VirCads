import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_3 extends Scene {
    constructor() {
        super('scene38_a_3');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_3') ? 'scene_38_a_3' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_3 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);

        // Create a VirTips-style overlay
        const centerX = 800;
        const centerY = 450;
        const overlayW = 1100;
        const overlayH = 620;
        const overlayDepth = 300;

        // blocker so background doesn't receive input
        const blocker = this.add.rectangle(centerX, centerY, 1600, 900, 0x000000, 0.5).setDepth(overlayDepth - 1);

        // Rounded rectangle via graphics for the card background
        const g = this.add.graphics().setDepth(overlayDepth);
        const x = centerX - overlayW / 2;
        const y = centerY - overlayH / 2;
        const radius = 18;
        g.fillStyle(0xffffff, 1);
        // draw rounded rect fill
        g.fillRoundedRect(x, y, overlayW, overlayH, radius);
        // stroke
        g.lineStyle(6, 0x000000, 1);
        g.strokeRoundedRect(x, y, overlayW, overlayH, radius);

        // top bar (blue) with rounded top corners matching outer radius
        const topBarH = 72;
        const gBar = this.add.graphics().setDepth(overlayDepth + 1);
        gBar.fillStyle(0x2a9df4, 1);
        gBar.beginPath();
        const left = x;
        const top = y;
        const right = x + overlayW;
        const barBottom = y + topBarH;
        // move to top-left corner (offset by radius)
        gBar.moveTo(left + radius, top);
        // top edge to near top-right
        gBar.lineTo(right - radius, top);
        // top-right arc
        gBar.arc(right - radius, top + radius, radius, -Math.PI / 2, 0, false);
        // right edge down to bar bottom
        gBar.lineTo(right, barBottom);
        // bottom edge to left
        gBar.lineTo(left, barBottom);
        // left edge up to top-left arc start
        gBar.lineTo(left, top + radius);
        // top-left arc
        gBar.arc(left + radius, top + radius, radius, Math.PI, -Math.PI / 2, false);
        gBar.closePath();
        gBar.fillPath();

        // small avatar on left of top bar (use lab_tech if present)
        const avatarX = x + 48;
        const avatarY = y + topBarH / 2 + 6;
        let avatar: Phaser.GameObjects.Image | Phaser.GameObjects.Arc;
        if (this.textures.exists('lab_tech')) {
            avatar = this.add.image(avatarX, avatarY, 'lab_tech').setDepth(overlayDepth + 2).setDisplaySize(48, 48);
        } else {
            avatar = this.add.circle(avatarX, avatarY, 24, 0xffffff).setDepth(overlayDepth + 2);
        }

        // title text
        const title = this.add.text(x + 100, y + 18, 'VirTips', { fontSize: '36px', color: '#000000', fontStyle: 'bold' }).setDepth(overlayDepth + 2);

        // close button top-right
        const closeX = x + overlayW - 36;
        const closeY = y + 18;
        const closeBtn = this.add.text(closeX, closeY, '✕', { fontSize: '32px', color: '#000000' }).setOrigin(0.5).setDepth(overlayDepth + 3).setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => {
            blocker.destroy();
            g.destroy();
            gBar.destroy();
            avatar.destroy();
            title.destroy();
            closeBtn.destroy();
            // destroy all content children we add below
            contentGroup.forEach(child => child.destroy());
            // proceed to next scene
            this.scene.start('scene38_a_4');
        });

        // Content: left text column and right image placeholder
        const contentGroup: Phaser.GameObjects.GameObject[] = [];

        // Left column text
        const leftX = x + 40;
        const leftY = y + topBarH + 30;
        const leftW = overlayW * 0.58 - 60;
        const heading = this.add.text(leftX, leftY, 'Lacerations', { fontSize: '22px', color: '#000000', fontStyle: 'bold' }).setDepth(overlayDepth + 2);
        contentGroup.push(heading);

        const bodyText = 'Lacerations are cuts, splits, or tears of the skin caused by blunt force that compresses or stretches the skin, often against underlying bone.';
        const body = this.add.text(leftX, leftY + 36, bodyText, { fontSize: '16px', color: '#111111', wordWrap: { width: leftW } }).setDepth(overlayDepth + 2);
        contentGroup.push(body);

        const keyPointsY = leftY + 160;
        const bullets = [
            'May extend through the full thickness of skin',
            'Can bleed heavily',
            'Common over bony areas (scalp, face, elbows, knees, shins)',
            'Shapes may be linear, curvilinear, or stellate',
            'Shape rarely identifies the weapon, unless accompanied by patterned injuries'
        ];
        bullets.forEach((b, i) => {
            const by = keyPointsY + i * 22;
            const bt = this.add.text(leftX + 8, by, `• ${b}`, { fontSize: '14px', color: '#111111' }).setDepth(overlayDepth + 2);
            contentGroup.push(bt);
        });

        // warning line
        const warnY = keyPointsY + bullets.length * 22 + 16;
        const warn = this.add.text(leftX, warnY, '⚠️ Do not confuse lacerations with incised wounds (sharp force).', { fontSize: '14px', color: '#111111' }).setDepth(overlayDepth + 2);
        contentGroup.push(warn);

        // right column image placeholder (simulate wound image) — use real texture if available
        const rightX = x + overlayW - (overlayW * 0.38) / 2 - 40;
        const rightY = leftY + 40;
        const imgW = overlayW * 0.38 - 80;
        const imgH = 220;
        if (this.textures.exists('laceration_img')) {
            const img = this.add.image(rightX, rightY + 60, 'laceration_img').setDepth(overlayDepth + 2);
            // fit into box
            const scale = Math.min((imgW) / img.width, (imgH) / img.height);
            img.setDisplaySize(img.width * scale, img.height * scale);
            contentGroup.push(img);
        } else {
            const imgBox = this.add.rectangle(rightX, rightY + 60, imgW, imgH, 0xffffff, 1).setDepth(overlayDepth + 2);
            imgBox.setStrokeStyle(2, 0x000000, 0.1);
            // red wound placeholder
            const wound = this.add.rectangle(rightX, rightY + 60, imgW - 24, imgH - 24, 0xcc3333, 1).setDepth(overlayDepth + 3);
            contentGroup.push(imgBox, wound);
        }

        // footer citation small
        const footer = this.add.text(x + 18, y + overlayH - 32, "Simpson's Forensic Medicine 15th edition...", { fontSize: '12px', color: '#333333' }).setDepth(overlayDepth + 2);
        contentGroup.push(footer);
    }
}

