import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene61 extends Scene {
    constructor() {
        super('Scene61');
    }

    create() {
        // background (prefer scene_27)
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Dialog + lab tech image on the left
        const dialogW = 820;
        const dialogH = 200;
        // shift dialog to the right so image can sit to its left
        const dialogX = 980;
        const dialogY = 450;

        // lab tech image (if available) on the left of the dialog
        if (this.textures.exists('lab_tech')) {
            const labX = dialogX - dialogW / 2 - 120; // left of dialog
            const lab = this.add.image(labX, dialogY, 'lab_tech');
            // scale image to fit nicely (max height ~360)
            const targetH = 360;
            const scale = targetH / lab.height;
            lab.setScale(scale);
            lab.setDepth(250);
        }

        const g = this.add.graphics().setDepth(260);
        g.fillStyle(0x1a3a8f, 1);
        g.fillRoundedRect(dialogX - dialogW / 2 - 6, dialogY - dialogH / 2 - 6, dialogW + 12, dialogH + 12, 14);
        g.fillStyle(0x2255cc, 1);
        g.fillRoundedRect(dialogX - dialogW / 2, dialogY - dialogH / 2, dialogW, dialogH, 12);

        const style = { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', align: 'left', wordWrap: { width: dialogW - 48 } } as any;
        const text = this.add.text(dialogX - dialogW / 2 + 24, dialogY - dialogH / 2 + 20,
            'Doctor, the Post-mortem Examination is complete. Please review and verify the recorded findings.', style)
            .setOrigin(0, 0)
            .setDepth(261);

        // Next button below the dialog -> starts Scene62
        const nextY = dialogY + dialogH / 2 + 48;
        const nextBtn = this.add.rectangle(dialogX, nextY, 160, 48, 0x1a3a8f, 1).setDepth(262).setInteractive({ useHandCursor: true });
        nextBtn.setStrokeStyle(2, 0xffffff, 0.5);
        const nextText = this.add.text(dialogX, nextY, 'Next', { fontSize: '18px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(263);
        nextBtn.on('pointerdown', () => {
            this.scene.start('Scene62');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
