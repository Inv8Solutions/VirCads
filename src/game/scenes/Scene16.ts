import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene16 extends Scene {
    background!: GameObjects.Image;
    textBox!: GameObjects.Text;
    flashOverlay!: GameObjects.Rectangle;

    constructor() {
        super('Scene16');
    }

    create() {
        // Background that fits the screen
        this.background = this.add.image(800, 450, 'scene_16');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

       

        // Textbox with documentation message
        this.textBox = this.add.text(800, 800, 'Click to continue', {
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
            align: 'center'
        });
        this.textBox.setOrigin(0.5, 0.5);
        this.textBox.setDepth(10);

        // Click listener for navigation and logging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene17');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
