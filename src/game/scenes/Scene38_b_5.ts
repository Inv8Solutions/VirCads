import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_5 extends Scene {
    constructor() {
        super('scene38_b_5');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Top-center dialog instructing the user about measuring the injury
        const dialogWidth = 760;
        const dialogX = 800;
        const dialogY = 80;
        const dialogPadding = 12;

        const dialogTextStr = 'You should now measure the width and length of the injury. Tap on next to access tools.';
        const dialogStyle = { fontSize: '18px', color: '#ffffff', align: 'center', wordWrap: { width: dialogWidth - 24 } };

        const dialogText = this.add.text(dialogX, 0, dialogTextStr, dialogStyle).setOrigin(0.5, 0).setDepth(11);
        const dialogBounds = dialogText.getBounds();
        const dialogHeight = dialogPadding * 2 + dialogBounds.height;

        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0x000000, 0.92)
            .setDepth(10);
        dialogBg.setStrokeStyle(2, 0xffffff, 0.08);

        const dialogTop = dialogY - dialogHeight / 2 + dialogPadding;
        dialogText.setPosition(dialogX, dialogTop);
        
        // Next button on bottom-right of dialog
        const nextW = 100;
        const nextH = 32;
        const margin = 12;
        const nextX = dialogX + dialogWidth / 2 - margin - nextW / 2;
        // position the button below the dialog (outside the black background)
        const nextY = dialogY + dialogHeight / 2 + margin + nextH / 2;
        const nextBg = this.add.rectangle(nextX, nextY, nextW, nextH, 0x0066cc)
            .setOrigin(0.5, 0.5)
            .setDepth(12)
            .setInteractive({ useHandCursor: true });
        const nextText = this.add.text(nextX, nextY, 'Next', { fontSize: '14px', color: '#ffffff' })
            .setOrigin(0.5, 0.5)
            .setDepth(13);
        nextBg.on('pointerdown', () => {
            this.scene.start('scene38_b_6');
        });
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_5 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
