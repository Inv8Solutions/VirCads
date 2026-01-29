import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene1 extends Scene
{
    background!: GameObjects.Image;

    constructor ()
    {
        super('Scene1');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'scene_1');
        
        // Make the background clickable to proceed to scene 2
        this.background.setInteractive();
        this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene1] Click at x: ${pointer.x}, y: ${pointer.y}`);
            this.changeScene();
        });

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('Scene2');
    }
}
