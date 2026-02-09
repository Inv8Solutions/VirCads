import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene17 extends Scene {
    background!: GameObjects.Image;
    textBox!: GameObjects.Text;
    flashOverlay!: GameObjects.Rectangle;

    constructor() {
        super('Scene17');
    }

    create() {
        // Background that fits the screen
        this.background = this.add.image(800, 450, 'scene_17');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

        

       

        // Click listener for navigation and logging — go to Scene18
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene18');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
