import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene24 extends Scene {
    graphics!: Phaser.GameObjects.Graphics;
    startPoint: { x: number; y: number } | null = null;
    measuring = false;
    infoText!: GameObjects.Text;
    instructionText!: GameObjects.Text;

    constructor() {
        super('Scene24');
    }

    create() {
        // background for the tool (scene_24)
        const bg = this.add.image(800, 450, 'scene_24');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // (no clipboard here) clipboard moved to Scene25

        // Click-to-continue dialog at bottom-center (no full-screen dark overlay)
        this.instructionText = this.add.text(800, 820, 'Click to continue', { fontSize: '20px', color: '#000000' }).setOrigin(0.5).setDepth(11);

        const dialogBg = this.add.rectangle(800, 820, 400, 64, 0xffffff, 0.95).setDepth(10);
        dialogBg.setStrokeStyle(2, 0x000000, 1);
        dialogBg.setInteractive({ useHandCursor: true });


        // clicking the dialog proceeds to the next scene
        dialogBg.on('pointerdown', () => {
            this.scene.start('Scene25');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
