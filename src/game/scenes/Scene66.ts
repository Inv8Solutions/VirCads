import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene66 extends Scene {
    constructor() {
        super('Scene66');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        EventBus.emit('current-scene-ready', this);
    }
}
