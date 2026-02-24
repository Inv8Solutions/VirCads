import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene54 extends Scene {
    constructor() {
        super('Scene54');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Next button (bottom-right) -> now jump to the swapped Scene53
        const nX = 1400;
        const nY = 850;
        const ntmp = this.add.text(0, 0, 'Next ➜', { fontSize: '22px', color: '#ffffff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(11);
        const nw = ntmp.width;
        const nh = ntmp.height;
        const nextBg = this.add.rectangle(nX, nY, nw + 36, nh + 16, 0x2a9df4).setOrigin(1, 1).setDepth(10).setStrokeStyle(2, 0x000000).setInteractive({ useHandCursor: true });
        const nextText = ntmp.setPosition(nX - (nw + 36) / 2, nY - (nh + 16) / 2).setDepth(11);
        nextBg.on('pointerover', () => nextBg.setAlpha(0.9));
        nextBg.on('pointerout', () => nextBg.setAlpha(1));
        nextBg.on('pointerup', (pt: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pt.x},${pt.y}) world=(${pt.worldX},${pt.worldY})`);
            this.scene.start('Scene55');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
