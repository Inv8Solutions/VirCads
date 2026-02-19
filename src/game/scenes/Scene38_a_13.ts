import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene38_a_13 extends Scene {
    constructor() {
        super('scene38_a_13');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_9') ? 'scene_38_a_9' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Add clipboard_4.png on the right side, vertically centered
        if (this.textures.exists('clipboard_4')) {
            const clipboard = this.add.image(1450, 450, 'clipboard_4');
            clipboard.setOrigin(0.5, 0.5);
            clipboard.setDisplaySize(260, 520); // Adjust size as needed
            clipboard.setDepth(1);
        } else {
            console.warn('clipboard_4.png not loaded in Boot.ts');
        }

        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_13 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
