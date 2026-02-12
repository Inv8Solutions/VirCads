import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene32 extends Scene {
    constructor() {
        super('Scene32');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_32');
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
                this.scene.start('Scene33');
            } catch (e) {
                console.warn('[Scene32] failed to start Scene33', e);
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
