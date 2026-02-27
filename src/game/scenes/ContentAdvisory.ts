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

        // "Click to continue" label at bottom center
        const contGfx = this.add.graphics().setDepth(10);
        contGfx.fillStyle(0xffffff, 0.85);
        contGfx.fillRoundedRect(700, 848, 200, 34, 10);
        this.add.text(800, 865, 'Click to continue', { fontSize: '18px', color: '#000000', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(11);

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        this.scene.start('IntroText');
    }
}
