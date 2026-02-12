import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene33 extends Scene {
    constructor() {
        super('Scene33');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_33');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        const status = this.add.text(800, 16, 'autopsy technician documentation in progress', { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5, 0).setDepth(90);

        // flash on enter
        const flash = this.add.rectangle(800, 450, 1600, 900, 0xffffff, 1).setDepth(100);
        this.tweens.add({ targets: flash, alpha: 0, duration: 300, ease: 'Cubic.easeOut', onComplete: () => flash.destroy() });

        const hint = this.add.text(800, 860, 'Click to continue', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(50);

        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerdown', () => {
            try {
                this.scene.start('Scene34');
            } catch (e) {
                console.warn('[Scene33] failed to start Scene34', e);
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
