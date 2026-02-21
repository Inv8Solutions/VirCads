import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene51 extends Scene {
    constructor() {
        super('Scene51');
    }

    create() {
        if (this.textures.exists('scene_35')) {
            const bg = this.add.image(800, 450, 'scene_35');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Dialog with lab_tech avatar
        const dlgWidth = 920;
        const dlgX = 800;
        const dlgY = 840;
        const dlgPadding = 14;
        const textStr = 'Should we now turn the body for us to examine its posterior, Doctor?';
        const baseTextStyle = { fontSize: '20px', color: '#222', fontFamily: 'Arial' } as Phaser.Types.GameObjects.Text.TextStyle;

        const dlgHeight = 88;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.96).setDepth(60).setOrigin(0.5);
        dlgBg.setStrokeStyle(2, 0x222222, 0.08);

        // lab_tech avatar on left of dialog (smaller, slightly raised)
        let avatarWidth = 0;
        const avatarLeftPad = 12;
        const avatarScale = 0.42;
        if (this.textures.exists('lab_tech')) {
            // move avatar slightly up so it doesn't get truncated by the dialog background
            const avatar = this.add.image(dlgX - dlgWidth / 2 + avatarLeftPad, dlgY - 8, 'lab_tech')
                .setDepth(61)
                .setOrigin(0, 0.5)
                .setScale(avatarScale);
            avatarWidth = avatar.displayWidth;
        }

        // compute text wrap width based on avatar width and padding, then add the text
        const textX = dlgX - dlgWidth / 2 + avatarLeftPad + avatarWidth + 12;
        const wrapWidth = Math.max(120, dlgWidth - (avatarWidth + avatarLeftPad + 12 + dlgPadding * 2));
        const dlgTextStyle = Object.assign({}, baseTextStyle, { wordWrap: { width: wrapWidth } });
        const dlgText = this.add.text(textX, dlgY, textStr, dlgTextStyle).setOrigin(0, 0.5).setDepth(61);

        // Ensure the dialog background is tall enough for wrapped text and re-center if needed
        const neededHeight = Math.max(dlgHeight, dlgText.height + dlgPadding * 2);
        if (neededHeight !== dlgHeight) {
            dlgBg.setSize(dlgWidth, neededHeight);
        }

        // Next button (bottom-right) to advance to Scene52
        const nextX = 1600 - 96; // near right edge
        const nextY = 860; // near bottom
        const nextW = 150;
        const nextH = 48;
        const nextBg = this.add.rectangle(nextX, nextY, nextW, nextH, 0x2a9df4)
            .setOrigin(0.5)
            .setDepth(70)
            .setInteractive({ useHandCursor: true });
        const nextText = this.add.text(nextX, nextY, 'Next', { fontSize: '20px', color: '#fff', fontFamily: 'Arial' })
            .setOrigin(0.5)
            .setDepth(71);
        nextBg.on('pointerover', () => nextBg.setAlpha(0.9));
        nextBg.on('pointerout', () => nextBg.setAlpha(1));
        nextBg.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene52');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
