import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_7 extends Scene {
    constructor() {
        super('scene38_b_7');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Top-middle dialog
        const dialogWidth = 760;
        const dialogX = 800;
        const dialogY = 80;
        const dialogPadding = 12;
        const dialogTextStr = 'Tap the selcted injury to zoom.';
        const dialogStyle = { fontSize: '18px', color: '#ffffff', align: 'center', wordWrap: { width: dialogWidth - 24 } };
        const dialogText = this.add.text(dialogX, 0, dialogTextStr, dialogStyle).setOrigin(0.5, 0).setDepth(11);
        const dialogBounds = dialogText.getBounds();
        const dialogHeight = dialogPadding * 2 + dialogBounds.height;
        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0x000000, 0.92).setDepth(10);
        dialogBg.setStrokeStyle(2, 0xffffff, 0.08);
        const dialogTop = dialogY - dialogHeight / 2 + dialogPadding;
        dialogText.setPosition(dialogX, dialogTop);

        // Blue bordered hitbox at specified coordinates
        const bx1 = 901.5;
        const by1 = 588;
        const bx2 = 955.5;
        const by2 = 650;
        const bRectX = Math.min(bx1, bx2);
        const bRectY = Math.min(by1, by2);
        const bRectW = Math.abs(bx2 - bx1);
        const bRectH = Math.abs(by2 - by1);

        const debugGraphics = this.add.graphics();
        debugGraphics.clear();
        debugGraphics.lineStyle(4, 0x0000ff, 1);
        debugGraphics.strokeRect(bRectX, bRectY, bRectW, bRectH);
        debugGraphics.setDepth(1000);

        const hitZone = this.add.rectangle(bRectX + bRectW / 2, bRectY + bRectH / 2, bRectW, bRectH, 0x000000, 0)
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(1001);

        hitZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_7 hitbox click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('scene38_b_8');
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_7 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
