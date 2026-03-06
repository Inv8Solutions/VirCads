import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene53 extends Scene {
    constructor() {
        super('Scene53');
    }

    create() {
        // (swapped) use scene_25 with lab_tech dialog
        if (this.textures.exists('scene_25')) {
            const bg = this.add.image(800, 450, 'scene_25');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Dialog with lab_tech avatar (bottom)
        const dlgWidth = 920;
        const dlgX = 800;
        const dlgY = 840;
        const dlgPadding = 14;
        const textStr = 'Should we now turn the body for us to examine its posterior, Doctor?';
        const baseTextStyle = { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial' } as Phaser.Types.GameObjects.Text.TextStyle;

        const dlgHeight = 88;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0x2255cc, 1).setDepth(60).setOrigin(0.5);
        dlgBg.setStrokeStyle(4, 0x1a3a8f, 1);

        // lab_tech avatar on left of dialog (smaller, slightly raised)
        let avatarWidth = 0;
        const avatarLeftPad = 12;
        const avatarScale = 0.42;
        if (this.textures.exists('lab_tech')) {
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

        // Ensure the dialog background is tall enough for wrapped text
        const neededHeight = Math.max(dlgHeight, dlgText.height + dlgPadding * 2);
        if (neededHeight !== dlgHeight) {
            dlgBg.setSize(dlgWidth, neededHeight);
        }

        // Next button (bottom-right) -> Scene54
        const nX = 1400;
        const nY = 850;
        const ntmp = this.add.text(0, 0, 'Next ➜', { fontSize: '22px', color: '#ffffff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(70);
        const nw = ntmp.width;
        const nh = ntmp.height;
        const nextBg = this.add.rectangle(nX, nY, nw + 36, nh + 16, 0x1a3a8f).setOrigin(1, 1).setDepth(69).setStrokeStyle(2, 0xffffff, 0.5).setInteractive({ useHandCursor: true });
        const nextText = ntmp.setPosition(nX - (nw + 36) / 2, nY - (nh + 16) / 2).setDepth(70);
        nextBg.on('pointerover', () => nextBg.setAlpha(0.9));
        nextBg.on('pointerout', () => nextBg.setAlpha(1));
        nextBg.on('pointerup', (pt: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pt.x},${pt.y}) world=(${pt.worldX},${pt.worldY})`);
            this.scene.start('Scene54');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
