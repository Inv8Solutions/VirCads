import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene17 extends Scene {
    background!: GameObjects.Image;
    flashOverlay!: GameObjects.Rectangle;
    nextButtonBg!: GameObjects.Rectangle;
    nextButtonText!: GameObjects.Text;

    constructor() {
        super('Scene17');
    }

    create() {
        // Background that fits the screen
        this.background = this.add.image(800, 450, 'scene_17');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

        // Bottom dialog
        const dialogW = 1400;
        const dialogH = 130;
        const dialogX = 700;
        const dialogY = 820;
        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogW, dialogH, 0x000000, 0.9).setDepth(20);
        dialogBg.setStrokeStyle(2, 0xffffff, 1);
        this.add.text(dialogX, dialogY, "Similar to how the clothed body was documented, the unclothed body should also be documented along with the case number with the examiner's initials and date of examination placed on each four sides of the body.", {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: dialogW - 40 }
        }).setOrigin(0.5).setDepth(21);

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
            console.log(`[INPUT] Scene17 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene18');
        });
        this.nextButtonText.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene17 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene18');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
