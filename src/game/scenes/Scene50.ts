import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50 extends Scene {
    constructor() {
        super('Scene50');
    }

    create() {
        // Simple placeholder for Scene50 — show background if available
        if (this.textures.exists('scene_46')) {
            const bg = this.add.image(800, 450, 'scene_46');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // (Quiz UI removed from this scene — transferred to Scene49_a)

        EventBus.emit('current-scene-ready', this);
    }
}
