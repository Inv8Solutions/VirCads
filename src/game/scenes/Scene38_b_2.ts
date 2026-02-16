import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_2 extends Scene {
    constructor() {
        super('scene38_b_2');
    }

    create() {
        // Use an existing loaded background
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // Add clipboard_3 image at top-right corner
        const clipboard = this.add.image(1600 - 40, 40, 'clipboard_3');
        clipboard.setOrigin(1, 0);
        clipboard.setDepth(100);
        clipboard.setScale(0.7);

        // Add label text 'contusion' at requested coordinates
        this.add.text(1144, 350.5, 'contusion', {
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setDepth(110);

        // Next button (bottom-right)
        const nextCenterX = 1600 - 80; // 80px from right edge
        const nextCenterY = 900 - 36; // 36px from bottom edge
        const nextBtn = this.add.rectangle(nextCenterX, nextCenterY, 140, 40, 0x0066cc)
            .setOrigin(0.5, 0.5)
            .setDepth(110)
            .setInteractive({ useHandCursor: true });
        this.add.text(nextCenterX, nextCenterY, 'Next', { fontSize: '16px', color: '#ffffff' })
            .setOrigin(0.5, 0.5).setDepth(111);

        nextBtn.on('pointerdown', () => {
            this.scene.start('scene38_b_3');
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_2 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
