import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene29 extends Scene {
    constructor() {
        super('Scene29');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_27');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // tips UI overlay
        const panelW = 1100;
        const panelH = 360;
        const panelX = 800;
        const panelY = 450;
        const panel = this.add.rectangle(panelX, panelY, panelW, panelH, 0xffffff, 0.95).setDepth(50).setStrokeStyle(2, 0x000000, 1);

        const tipText = `Always remember that when documenting a cadaver’s overall view, it should be along with the case number with the examiner's initials and date of examination placed on four sides of the body: above the head; on the body's left side; below the feet; and on the body's right side, each to be documented separately.`;
        const tip = this.add.text(panelX - panelW/2 + 24, panelY - panelH/2 + 24, tipText, { fontSize: '26px', color: '#000000', lineSpacing: 6, wordWrap: { width: panelW - 48 } }).setDepth(51).setOrigin(0,0);

        const continueText = this.add.text(panelX, panelY + panelH/2 - 36, 'Click here to continue', { fontSize: '30px', color: '#000000', backgroundColor: '#ffffff', padding: { x: 20, y: 14 } }).setOrigin(0.5).setDepth(52);
        continueText.setInteractive({ useHandCursor: true });
        const startNext = () => {
            try {
                this.scene.start('Scene30');
            } catch (e) {
                console.warn('[Scene29] failed to start Scene30', e);
            }
        };
        continueText.on('pointerdown', startNext);

        // allow clicking the panel background to continue as well
        panel.setInteractive({ useHandCursor: true });
        panel.on('pointerdown', startNext);

        // also allow clicking the overall background
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerdown', startNext);

        EventBus.emit('current-scene-ready', this);
    }
}
