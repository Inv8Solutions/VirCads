import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_5 extends Scene {
    constructor() {
        super('scene38_b_5');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        this.add.text(800, 450, 'scene38_b_5 placeholder', {
            fontSize: '28px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setDepth(10);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_5 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
