import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50_a_5 extends Scene {
    constructor() {
        super('Scene50_a_5');
    }

    create() {
        if (this.textures.exists('scene_50_a_5')) {
            const bg = this.add.image(800, 450, 'scene_50_a_5');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        const info = this.add.text(800, 450, 'Scene 50_a_5', { fontSize: '28px', color: '#fff', fontFamily: 'Arial' })
            .setOrigin(0.5)
            .setDepth(10);

        EventBus.emit('current-scene-ready', this);
    }
}
