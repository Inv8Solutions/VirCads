import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene27 extends Scene {
    constructor() {
        super('Scene27');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_27');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        EventBus.emit('current-scene-ready', this);
    }
}
