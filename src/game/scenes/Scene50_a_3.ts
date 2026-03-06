import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50_a_3 extends Scene {
    constructor() {
        super('Scene50_a_3');
    }

    create() {
        if (this.textures.exists('scene_50_a_1')) {
            const bg = this.add.image(800, 450, 'scene_50_a_1');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }
        // Quiz UI - white rounded panel with black border (match other quiz scenes)
        const panelW = 1120;
        const panelH = 360;
        const panelX = 800;
        const panelY = 300;
        const cornerR = 12;
        const panelG = this.add.graphics().setDepth(48);
        const panelX0 = panelX - panelW / 2;
        const panelY0 = panelY - panelH / 2;
        panelG.fillStyle(0x1a3a8f, 1);
        panelG.fillRoundedRect(panelX0 - 6, panelY0 - 6, panelW + 12, panelH + 12, cornerR + 2);
        panelG.fillStyle(0x2255cc, 1);
        panelG.fillRoundedRect(panelX0, panelY0, panelW, panelH, cornerR);

        const qX = 800;
        const qY = 140;
        const question = 'What type of injury is currently being examined.';
        this.add.text(qX, qY, question, { fontSize: '22px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: 1000 } })
            .setOrigin(0.5).setDepth(50);

        const optionLabels = [
            'Stab wound',
            'Abrasion',
            'Laceration',
            'Contusion',
            'Incised wound'
        ];

        const radioX = 560;
        const labelX = 600;
        const startY = 220;
        const gapY = 42;

        const radioButtons: { [k: string]: Phaser.GameObjects.Shape } = {};
        let selectedRadio: string | null = null;

        optionLabels.forEach((lbl, i) => {
            const letter = ['A', 'B', 'C', 'D', 'E'][i];
            const y = startY + i * gapY;

            const radio = this.add.circle(radioX, y, 12, 0xffffff, 0.2).setStrokeStyle(2, 0xffffff, 0.6).setDepth(51).setInteractive({ useHandCursor: true });
            const text = this.add.text(labelX, y, `${letter}. ${lbl}`, { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', wordWrap: { width: 900 } }).setOrigin(0, 0.5).setDepth(51);

            radio.on('pointerdown', () => {
                Object.values(radioButtons).forEach(r => r.setFillStyle(0xffffff, 0.2));
                radio.setFillStyle(0xffffff, 0.8);
                selectedRadio = letter;
            });

            radioButtons[letter] = radio;
        });

        // Submit button (bottom-right) drawn as rounded white button with black stroke
        const sX = 1500;
        const sY = 850;
        const tmp = this.add.text(0, 0, 'Submit', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(53);
        const sw = tmp.width;
        const sh = tmp.height;
        const submitW = sw + 40;
        const submitH = sh + 20;
        const submitX0 = sX - submitW;
        const submitY0 = sY - submitH;
        const submitG = this.add.graphics().setDepth(51);
        submitG.fillStyle(0x1a3a8f, 1);
        submitG.fillRoundedRect(submitX0, submitY0, submitW, submitH, 8);
        submitG.lineStyle(2, 0xffffff, 0.5);
        submitG.strokeRoundedRect(submitX0, submitY0, submitW, submitH, 8);
        const submitHit = this.add.rectangle(sX, sY, submitW, submitH, 0xffffff, 0).setOrigin(1, 1).setDepth(52).setInteractive({ useHandCursor: true });
        const submitText = tmp.setPosition(sX - submitW / 2, sY - submitH / 2).setDepth(53);
        submitHit.on('pointerover', () => {
            submitG.clear();
            submitG.fillStyle(0x122266, 1);
            submitG.fillRoundedRect(submitX0, submitY0, submitW, submitH, 8);
            submitG.lineStyle(2, 0xffffff, 0.5);
            submitG.strokeRoundedRect(submitX0, submitY0, submitW, submitH, 8);
        });
        submitHit.on('pointerout', () => {
            submitG.clear();
            submitG.fillStyle(0x1a3a8f, 1);
            submitG.fillRoundedRect(submitX0, submitY0, submitW, submitH, 8);
            submitG.lineStyle(2, 0xffffff, 0.5);
            submitG.strokeRoundedRect(submitX0, submitY0, submitW, submitH, 8);
        });
        submitHit.on('pointerdown', (p: Phaser.Input.Pointer) => {
            if (!selectedRadio) return;

            const correctLetter = 'B';
            const isCorrect = selectedRadio === correctLetter;

            // Blur + transparent blocker to stop clicks reaching underlying UI
            const blur = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7).setDepth(199);
            const blocker = this.add.rectangle(800, 450, 1600, 900, 0xffffff, 0).setDepth(200).setInteractive();

            const tooltipKey = isCorrect ? 'correct_tooltip' : 'wrong_tooltip';
            const tooltip = this.add.image(800, 450, tooltipKey).setDepth(300).setInteractive();
            tooltip.on('pointerdown', () => {
                tooltip.setVisible(false);
                blur.setVisible(false);
                blocker.destroy();
            });

            // Next button drawn above blocker
            const nX = 1400;
            const nY = 850;
            const ntmp = this.add.text(0, 0, 'Next ➡️', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(303);
            const nw = ntmp.width;
            const nh = ntmp.height;
            const nextW = nw + 40;
            const nextH = nh + 20;
            const nextX0 = nX - nextW;
            const nextY0 = nY - nextH;
            const nextG = this.add.graphics().setDepth(301);
            nextG.fillStyle(0x1a3a8f, 1);
            nextG.fillRoundedRect(nextX0, nextY0, nextW, nextH, 8);
            nextG.lineStyle(2, 0xffffff, 0.5);
            nextG.strokeRoundedRect(nextX0, nextY0, nextW, nextH, 8);
            const nextHit = this.add.rectangle(nX, nY, nextW, nextH, 0xffffff, 0).setOrigin(1, 1).setDepth(302).setInteractive({ useHandCursor: true });
            const nextButtonText = ntmp.setPosition(nX - nextW / 2, nY - nextH / 2).setDepth(303);
            nextHit.on('pointerover', () => {
                nextG.clear();
                nextG.fillStyle(0x122266, 1);
                nextG.fillRoundedRect(nextX0, nextY0, nextW, nextH, 8);
                nextG.lineStyle(2, 0xffffff, 0.5);
                nextG.strokeRoundedRect(nextX0, nextY0, nextW, nextH, 8);
            });
            nextHit.on('pointerout', () => {
                nextG.clear();
                nextG.fillStyle(0x1a3a8f, 1);
                nextG.fillRoundedRect(nextX0, nextY0, nextW, nextH, 8);
                nextG.lineStyle(2, 0xffffff, 0.5);
                nextG.strokeRoundedRect(nextX0, nextY0, nextW, nextH, 8);
            });
            nextHit.on('pointerdown', (pt: Phaser.Input.Pointer) => {
                // cleanup overlay elements
                tooltip.setVisible(false);
                blur.setVisible(false);
                blocker.destroy();
                this.input.off('pointerup', overlayPointerUp);
                this.scene.start('Scene50_a_4');
            });

            // Fallback: also listen for pointerup at scene level to detect clicks on the Next region
            const overlayPointerUp = (pointer: Phaser.Input.Pointer) => {
                if (!tooltip.visible) return;
                const px = pointer.x;
                const py = pointer.y;
                if (px >= nextX0 && px <= nextX0 + nextW && py >= nextY0 && py <= nextY0 + nextH) {
                    // simulate next click
                    tooltip.setVisible(false);
                    blur.setVisible(false);
                    blocker.destroy();
                    this.input.off('pointerup', overlayPointerUp);
                    this.scene.start('Scene50_a_4');
                }
            };
            this.input.on('pointerup', overlayPointerUp);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
