import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene22 extends Scene {
    background!: GameObjects.Image;
    textBox!: GameObjects.Text;
    flashOverlay!: GameObjects.Rectangle;

    constructor() {
        super('Scene22');
    }

    create() {
        // Background that fits the screen
        this.background = this.add.image(800, 450, 'scene_22');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

        
        

        // Click listener for navigation and logging — return to Scene1
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            
        });

        // Invisible hitbox that redirects to Scene23
        // Use a Zone (invisible interactive area) placed above other objects
        const hitboxZone = this.add.zone(1241, 257.5, 160, 160);
        hitboxZone.setOrigin(0.5, 0.5);
        hitboxZone.setInteractive({ useHandCursor: true });
        hitboxZone.setDepth(1000);
        console.log('[DEBUG] Scene22 hitbox zone created at (1241,257.5) size=160x160');
        hitboxZone.on('pointerdown', (pointer: Phaser.Input.Pointer, localX?: number, localY?: number, event?: any) => {
            if (event && typeof event.stopPropagation === 'function') {
                event.stopPropagation();
            }
            console.log(`[INPUT] hitbox zone click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene23');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
