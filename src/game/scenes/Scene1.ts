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
        
        // Hitbox covering (77,797.5) -> (461,841.5)
        const hitboxX = (77 + 461) / 2;   // 269
        const hitboxY = (797.5 + 841.5) / 2; // 819.5
        const hitboxW = 461 - 77;  // 384
        const hitboxH = 841.5 - 797.5; // 44
        const hitbox = this.add.rectangle(hitboxX, hitboxY, hitboxW, hitboxH, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
            .setDepth(10);
        hitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene1] Hitbox click at x: ${pointer.x}, y: ${pointer.y}`);
            this.changeScene();
        });

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('Scene2');
    }
}
