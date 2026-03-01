import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene60 extends Scene {
    constructor() {
        super('Scene60');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Measurement removed for this scene.

        // Centered informational dialog
        const infoW = 820;
        const infoH = 220;
        const infoX = 800;
        const infoY = 450;
        const infoG = this.add.graphics().setDepth(260);
        infoG.fillStyle(0xffffff, 1);
        infoG.fillRoundedRect(infoX - infoW / 2, infoY - infoH / 2, infoW, infoH, 12);
        infoG.lineStyle(2, 0x000000, 1);
        infoG.strokeRoundedRect(infoX - infoW / 2, infoY - infoH / 2, infoW, infoH, 12);

        const infoStyle = { fontSize: '20px', color: '#000', fontFamily: 'Arial', align: 'center', wordWrap: { width: infoW - 40 } } as any;
        const infoText = this.add.text(infoX, infoY - 32, 'In real world, all injuries must be examined, measured, and photographed. Since we are in a virtual morgue, Your Autopsy technician have already measured and documented the remaining injuries for you.', infoStyle)
            .setOrigin(0.5, 0)
            .setDepth(261);

        const okX = infoX;
        const okY = infoY + infoH / 2 - 36;
        const okBtn = this.add.rectangle(okX, okY, 140, 48, 0x388e3c, 0.95).setDepth(262).setInteractive({ useHandCursor: true });
        const okText = this.add.text(okX, okY, 'OK', { fontSize: '18px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(263);
        okBtn.on('pointerdown', () => {
            infoG.destroy();
            infoText.destroy();
            okBtn.destroy();
            okText.destroy();
            this.scene.start('Scene61');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
