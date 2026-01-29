import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class ContentAdvisory extends Scene
{
    background!: GameObjects.Image;

    constructor ()
    {
        super('ContentAdvisory');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'content_advisory');
        
        // Make the content advisory clickable to proceed to the next scene
        this.background.setInteractive();
        this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[ContentAdvisory] Click at x: ${pointer.x}, y: ${pointer.y}`);
            this.changeScene();
        });

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        this.scene.start('IntroText');
    }
}
