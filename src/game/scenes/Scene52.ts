import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene52 extends Scene {
    constructor() {
        super('Scene52');
    }

    create() {
        // Use scene_35 as the background for this scene
        if (this.textures.exists('scene_35')) {
            const bg = this.add.image(800, 450, 'scene_35');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Quiz UI
        const qX = 800;
        const qY = 140;
        const question = 'To inspect and document the victim’s back side, flip the victim to what position?';
        // white panel behind the quiz for readability (rounded corners + black border)
        const panelW = 1120;
        const panelH = 400;
        const panelX = 800;
        const panelY = 320;
        const cornerR = 12;
        const panelG = this.add.graphics().setDepth(48);
        const panelX0 = panelX - panelW / 2;
        const panelY0 = panelY - panelH / 2;
        panelG.fillStyle(0x1a3a8f, 1);
        panelG.fillRoundedRect(panelX0 - 6, panelY0 - 6, panelW + 12, panelH + 12, cornerR + 2);
        panelG.fillStyle(0x2255cc, 1);
        panelG.fillRoundedRect(panelX0, panelY0, panelW, panelH, cornerR);

        this.add.text(qX, qY, question, { fontSize: '22px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: 1000 } })
            .setOrigin(0.5).setDepth(50);

        // Two radio-style options
        const optionLabels = [
            'Prone position',
            'Supine Position'
        ];

        const radioX = 560;
        const labelX = 600;
        const startY = 240;
        const gapY = 48;

        const radioButtons: { [k: string]: Phaser.GameObjects.Shape } = {};
        let selectedRadio: string | null = null;

        optionLabels.forEach((lbl, i) => {
            const letter = ['A', 'B'][i];
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

        // Submit button (bottom-right)
        const sX = 1500;
        const sY = 850;
        const tmp = this.add.text(0, 0, 'Submit', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(53);
        const sw = tmp.width;
        const sh = tmp.height;
        // draw rounded submit button background (visual)
        const submitG = this.add.graphics().setDepth(51);
        const submitW = sw + 40;
        const submitH = sh + 20;
        const submitX0 = sX - submitW;
        const submitY0 = sY - submitH;
        submitG.fillStyle(0x1a3a8f, 1);
        submitG.fillRoundedRect(submitX0, submitY0, submitW, submitH, 8);
        submitG.lineStyle(2, 0xffffff, 0.5);
        submitG.strokeRoundedRect(submitX0, submitY0, submitW, submitH, 8);
        // invisible interactive hit rect on top of the graphics
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
            console.log('[Scene52] Submit clicked', selectedRadio);
            if (!selectedRadio) return;

            // Blur overlay (visual only) and a transparent interactive blocker underneath tooltip + controls
            const blur = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7).setDepth(199);
            // transparent blocker sits above most UI but below tooltip/next so it prevents clicks reaching underlying buttons
            const blocker = this.add.rectangle(800, 450, 1600, 900, 0xffffff, 0).setDepth(200).setInteractive();

            const tooltipKey = selectedRadio === 'A' ? 'correct_tooltip' : 'wrong_tooltip';
            const tooltip = this.add.image(800, 450, tooltipKey).setDepth(300).setInteractive();
            tooltip.on('pointerdown', () => {
                tooltip.setVisible(false);
                blur.setVisible(false);
                blocker.destroy();
            });

            // Next button (bottom right) - drawn above blocker so clicks register here
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
                console.log(`[INPUT] click screen=(${pt.x},${pt.y}) world=(${pt.worldX},${pt.worldY})`);
                // cleanup overlay elements
                tooltip.setVisible(false);
                blur.setVisible(false);
                blocker.destroy();
                this.input.off('pointerup', overlayPointerUp);
                this.scene.start('Scene53');
            });

            // Fallback: also listen for pointerup at scene level to detect clicks on the Next region
            const overlayPointerUp = (pointer: Phaser.Input.Pointer) => {
                if (!tooltip.visible) return;
                const px = pointer.x;
                const py = pointer.y;
                if (px >= nextX0 && px <= nextX0 + nextW && py >= nextY0 && py <= nextY0 + nextH) {
                    // simulate next click
                    console.log(`[INPUT-FALLBACK] click screen=(${px},${py})`);
                    tooltip.setVisible(false);
                    blur.setVisible(false);
                    blocker.destroy();
                    this.input.off('pointerup', overlayPointerUp);
                    this.scene.start('Scene53');
                }
            };
            this.input.on('pointerup', overlayPointerUp);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
