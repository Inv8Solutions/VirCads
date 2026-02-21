import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene52 extends Scene {
    constructor() {
        super('Scene52');
    }

    create() {
        if (this.textures.exists('scene_36')) {
            const bg = this.add.image(800, 450, 'scene_36');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        const info = this.add.text(800, 450, 'Scene 52', { fontSize: '28px', color: '#fff', fontFamily: 'Arial' })
            .setOrigin(0.5)
            .setDepth(10);

        EventBus.emit('current-scene-ready', this);
    }
}
