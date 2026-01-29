import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class IntroText extends Scene
{
    background!: GameObjects.Image;

    constructor ()
    {
        super('IntroText');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'intro_text');
        
        // Make the background clickable to proceed to scene 1
        this.background.setInteractive();
        this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[IntroText] Click at x: ${pointer.x}, y: ${pointer.y}`);
            this.changeScene();
        });

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        this.scene.start('Scene1');
    }
}
