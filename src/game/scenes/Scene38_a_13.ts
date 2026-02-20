import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene38_a_13 extends Scene {
    constructor() {
        super('scene38_a_13');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_9') ? 'scene_38_a_9' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Add clipboard_4.png on the right side, vertically centered
        if (this.textures.exists('clipboard_4')) {
            const clipboard = this.add.image(1161, 308, 'clipboard_4');
            clipboard.setOrigin(0.5, 0.5);
            clipboard.setDisplaySize(400, 520); // Adjust size as needed
            clipboard.setDepth(1);
        } else {
            console.warn('clipboard_4.png not loaded in Boot.ts');
        }

        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_13 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        // Add a bottom-right "Next" button that starts scene39
        const padding = 20;
        const btnWidth = 160;
        const btnHeight = 56;
        const btnRight = 1600 - padding;
        const btnBottom = 900 - padding;
        const btnCenterX = btnRight - btnWidth / 2;
        const btnCenterY = btnBottom - btnHeight / 2;

        const btnRect = this.add.rectangle(btnCenterX, btnCenterY, btnWidth, btnHeight, 0xffffff, 1).setDepth(2).setStrokeStyle(2, 0x000000);
        const btnText = this.add.text(btnCenterX, btnCenterY, 'Next', { fontFamily: 'Arial', fontSize: '28px', color: '#000000' }).setOrigin(0.5).setDepth(3);

        btnRect.setInteractive({ useHandCursor: true });
        btnRect.on('pointerover', () => btnRect.setFillStyle(0xeeeeee, 1));
        btnRect.on('pointerout', () => btnRect.setFillStyle(0xffffff, 1));

        btnRect.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_13 NEXT click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
            this.scene.start('scene39');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
