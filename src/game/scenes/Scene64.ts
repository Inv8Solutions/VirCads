import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene64 extends Scene {
    constructor() {
        super('Scene64');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Centered completion dialog
        const infoW = 820;
        const infoH = 180;
        const infoX = 800;
        const infoY = 430;
        const infoG = this.add.graphics().setDepth(260);
        infoG.fillStyle(0x1a3a8f, 1);
        infoG.fillRoundedRect(infoX - infoW / 2 - 6, infoY - infoH / 2 - 6, infoW + 12, infoH + 12, 14);
        infoG.fillStyle(0x2255cc, 1);
        infoG.fillRoundedRect(infoX - infoW / 2, infoY - infoH / 2, infoW, infoH, 12);

        const infoStyle = { fontSize: '24px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: infoW - 40 } } as any;
        const infoText = this.add.text(infoX, infoY - 20, 'Postmortem Examination Complete,\nCongratulations', infoStyle)
            .setOrigin(0.5, 0.5)
            .setDepth(261);

        const okX = infoX;
        const okY = infoY + infoH / 2 - 36;
        const okBtn = this.add.rectangle(okX, okY, 140, 48, 0x1a3a8f).setDepth(262).setInteractive({ useHandCursor: true });
        const okText = this.add.text(okX, okY, 'OK', { fontSize: '18px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(263);
        okBtn.on('pointerdown', () => {
            infoG.destroy();
            infoText.destroy();
            okBtn.destroy();
            okText.destroy();
            this.scene.start('Scene65');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
