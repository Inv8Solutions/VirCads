import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene2 extends Scene
{
    background!: GameObjects.Image;
    hiddenHitbox!: GameObjects.Rectangle;
    hiddenHitbox2!: GameObjects.Rectangle;
    reqForm!: GameObjects.Image;
    blurOverlay!: GameObjects.Rectangle;

    constructor ()
    {
        super('Scene2');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'scene_2');
        
        // Hidden hitbox 1 based on coordinates:
        // Top left: (822, 34.5), Top right: (1536, 36.5)
        // Bottom left: (821, 874.5), Bottom right: (1536, 871.5)
        const hitboxX = (822 + 1536) / 2; // center X = 1179
        const hitboxY = (34.5 + 874.5) / 2; // center Y = 454.5
        const hitboxWidth = 1536 - 822; // width = 714
        const hitboxHeight = 874.5 - 34.5; // height = 840
        
        this.hiddenHitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        this.hiddenHitbox.setInteractive({ useHandCursor: true });
        this.hiddenHitbox.setAlpha(0.001); // Nearly invisible but still interactive
        this.hiddenHitbox.setDepth(10); // Above background
        
        this.hiddenHitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene2] Hidden hitbox 1 clicked at x: ${pointer.x}, y: ${pointer.y}`);
            this.showReqForm();
        });

        // Hidden hitbox 2 based on coordinates:
        // Top left: (73, 792.5), Bottom right: (748, 840.5)
        const hitbox2X = (73 + 748) / 2; // center X = 410.5
        const hitbox2Y = (792.5 + 840.5) / 2; // center Y = 816.5
        const hitbox2Width = 748 - 73; // width = 675
        const hitbox2Height = 840.5 - 792.5; // height = 48
        
        this.hiddenHitbox2 = this.add.rectangle(hitbox2X, hitbox2Y, hitbox2Width, hitbox2Height);
        this.hiddenHitbox2.setInteractive({ useHandCursor: true });
        this.hiddenHitbox2.setAlpha(0.001); // Nearly invisible but still interactive
        this.hiddenHitbox2.setDepth(10); // Above background
        
        this.hiddenHitbox2.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene2] Hidden hitbox 2 clicked at x: ${pointer.x}, y: ${pointer.y}`);
            this.scene.start('Scene3');
        });

        // Debug: log click coordinates on background (lower depth)
        this.background.setInteractive();
        this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene2] Background click at x: ${pointer.x}, y: ${pointer.y}`);
        });

        EventBus.emit('current-scene-ready', this);
    }

    showReqForm ()
    {
        // Show blur overlay behind the req form
        if (!this.blurOverlay) {
            this.blurOverlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7);
            this.blurOverlay.setDepth(99);
            this.blurOverlay.setInteractive(); // Block clicks to elements behind
        } else {
            this.blurOverlay.setVisible(true);
        }

        // Show req_form.png in the middle of the screen
        if (!this.reqForm) {
            this.reqForm = this.add.image(800, 450, 'req_form');
            this.reqForm.setDepth(100);
            
            // Make it clickable to hide it
            this.reqForm.setInteractive();
            this.reqForm.on('pointerdown', () => {
                this.reqForm.setVisible(false);
                this.blurOverlay.setVisible(false);
            });
        } else {
            this.reqForm.setVisible(true);
        }
    }
}
