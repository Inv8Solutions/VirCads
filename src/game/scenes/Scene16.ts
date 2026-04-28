import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene16 extends Scene {
    background!: GameObjects.Image;
    flashOverlay!: GameObjects.Rectangle;
    nextButtonBg!: GameObjects.Rectangle;
    nextButtonText!: GameObjects.Text;

    constructor() {
        super('Scene16');
    }

    create() {
        // Background that fits the screen
        this.background = this.add.image(800, 450, 'scene_9');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

        // Top dialog with lab tech speaker
        const topDlgW = 1040;
        const topDlgH = 170;
        const topDlgX = 880;
        const topDlgY = 140;
        const topDlg = this.add.rectangle(topDlgX, topDlgY, topDlgW, topDlgH, 0x000000, 0.9).setDepth(20);
        topDlg.setStrokeStyle(2, 0xffffff, 1);

        if (this.textures.exists('lab_tech')) {
            const labX = topDlgX - topDlgW / 2 - 90;
            const lab = this.add.image(labX, topDlgY, 'lab_tech').setDepth(21);
            const targetH = 220;
            const scale = targetH / lab.height;
            lab.setScale(scale);
        } else {
            const ph = this.add.circle(topDlgX - topDlgW / 2 - 90, topDlgY, 40, 0x000000, 0.9).setDepth(21);
            ph.setStrokeStyle(2, 0xffffff, 1);
            this.add.text(ph.x, ph.y, 'Tech', { fontSize: '14px', color: '#ffffff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(22);
        }

        this.add.text(
            topDlgX,
            topDlgY,
            "I will now remove the body's clothes and put it in an evidence bag for you to examine the body properly.",
            { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: topDlgW - 40 } }
        ).setOrigin(0.5).setDepth(21);

        // Next button (bottom-right)
        const nextBtnW = 160;
        const nextBtnH = 48;
        const nextBtnX = 1520;
        const nextBtnY = 850;
        this.nextButtonBg = this.add.rectangle(nextBtnX, nextBtnY, nextBtnW, nextBtnH, 0x000000, 1).setDepth(25);
        this.nextButtonBg.setStrokeStyle(2, 0xffffff, 1);
        this.nextButtonText = this.add.text(nextBtnX, nextBtnY, 'Next', { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial' })
            .setOrigin(0.5)
            .setDepth(26);
        this.nextButtonBg.setInteractive({ useHandCursor: true });
        this.nextButtonText.setInteractive({ useHandCursor: true });
        this.nextButtonBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene16 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene17');
        });
        this.nextButtonText.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene16 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene17');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
