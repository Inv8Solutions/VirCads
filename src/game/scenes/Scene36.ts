import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene36 extends Scene {
    constructor() {
        super('Scene36');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_35');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        const hint = this.add.text(800, 860, 'Click to continue', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(50);

        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerdown', () => {
            try {
                this.scene.start('Scene1');
            } catch (e) {
                console.warn('[Scene36] failed to start Scene1', e);
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
