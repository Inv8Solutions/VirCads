import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50 extends Scene {
    constructor() {
        super('Scene50');
    }

    create() {
        // Simple placeholder for Scene50 — show background if available
        if (this.textures.exists('scene_46')) {
            const bg = this.add.image(800, 450, 'scene_46');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Quiz UI (use same interaction pattern as Scene10)
        const qX = 800;
        const qY = 140;
        const question = 'What is the main characteristic that distinguishes a stab wound from a laceration?';
        this.add.text(qX, qY, question, { fontSize: '22px', color: '#fff', fontFamily: 'Arial', align: 'center', wordWrap: { width: 1000 } })
            .setOrigin(0.5).setDepth(50);

        // Radio-style options A/B/C
        const optionLabels = [
            'Tissues bridging at the opening of the wound',
            'Clean and sharp wound edges',
            'Wound with greater depth than length'
        ];

        const radioX = 540; // left side for radio circles
        const labelX = 580;
        const startY = 240;
        const gapY = 36;

        const radioButtons: { [k: string]: Phaser.GameObjects.Shape } = {};
        let selectedRadio: string | null = null;

        optionLabels.forEach((lbl, i) => {
            const letter = ['A', 'B', 'C'][i];
            const y = startY + i * gapY;

            // radio circle
            const radio = this.add.circle(radioX, y, 10, 0xffffff).setStrokeStyle(2, 0x000000).setDepth(51).setInteractive({ useHandCursor: true });
            const text = this.add.text(labelX, y, `${letter}. ${lbl}`, { fontSize: '20px', color: '#fff', fontFamily: 'Arial', wordWrap: { width: 900 } }).setOrigin(0, 0.5).setDepth(51);

            radio.on('pointerdown', () => {
                // clear others
                Object.values(radioButtons).forEach(r => r.setFillStyle(0xffffff));
                radio.setFillStyle(0x000000);
                selectedRadio = letter;
            });

            radioButtons[letter] = radio;
        });

        // Submit button
        const sX = 1500;
        const sY = 850;
        const tmp = this.add.text(0, 0, 'Submit', { fontSize: '28px', color: '#000000' }).setOrigin(0.5, 0.5).setDepth(52);
        const sw = tmp.width;
        const sh = tmp.height;
        const submitBg = this.add.rectangle(sX, sY, sw + 40, sh + 20, 0xffffff).setOrigin(1, 1).setStrokeStyle(2, 0x000000).setDepth(51);
        const submitText = tmp.setPosition(sX - (sw + 40) / 2, sY - (sh + 20) / 2).setDepth(52);
        submitBg.setInteractive({ useHandCursor: true });
        submitBg.on('pointerover', () => submitBg.setFillStyle(0xf6f6f6));
        submitBg.on('pointerout', () => submitBg.setFillStyle(0xffffff));
        submitBg.on('pointerdown', () => {
            console.log('[Scene50] Submit clicked', selectedRadio);
            if (!selectedRadio) return;

            // Blur overlay (non-interactive)
            const blur = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7).setDepth(99);

            const tooltipKey = selectedRadio === 'C' ? 'correct_tooltip' : 'wrong_tooltip';
            const tooltip = this.add.image(800, 450, tooltipKey).setDepth(100).setInteractive();
            tooltip.on('pointerdown', () => {
                tooltip.setVisible(false);
                blur.setVisible(false);
                // Next button remains
            });

            // Next button (bottom right)
            const nX = 1400;
            const nY = 850;
            const ntmp = this.add.text(0, 0, 'Next ➜', { fontSize: '28px', color: '#000000' }).setOrigin(0.5, 0.5).setDepth(103);
            const nw = ntmp.width;
            const nh = ntmp.height;
            const nextButtonBg = this.add.rectangle(nX, nY, nw + 40, nh + 20, 0xffffff).setOrigin(1, 1).setStrokeStyle(2, 0x000000).setDepth(102);
            const nextButtonText = ntmp.setPosition(nX - (nw + 40) / 2, nY - (nh + 20) / 2).setDepth(103);
            nextButtonBg.setInteractive({ useHandCursor: true });
            nextButtonBg.on('pointerover', () => nextButtonBg.setFillStyle(0xf6f6f6));
            nextButtonBg.on('pointerout', () => nextButtonBg.setFillStyle(0xffffff));
            nextButtonBg.on('pointerdown', () => {
                this.scene.start('Scene51');
            });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
