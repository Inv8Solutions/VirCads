import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_1 extends Scene {
    constructor() {
        super('scene38_b_1');
    }

    create() {
        // background image (fallback to scene_38 which is loaded)
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // Blue bordered square at specified coordinates (visible above background)
        const bx1 = 898;
        const by1 = 596.5;
        const bx2 = 950;
        const by2 = 646.5;
        const bRectX = Math.min(bx1, bx2);
        const bRectY = Math.min(by1, by2);
        const bRectW = Math.abs(bx2 - bx1);
        const bRectH = Math.abs(by2 - by1);

        const debugGraphics = this.add.graphics();
        debugGraphics.clear();
        debugGraphics.lineStyle(4, 0x0000ff, 1);
        debugGraphics.strokeRect(bRectX, bRectY, bRectW, bRectH);
        debugGraphics.setDepth(1000);
        this.children.bringToTop(debugGraphics);
        // Quiz UI - top center (size adjusts to content)
        const quizWidth = 760;
        const quizX = 800;
        const quizY = 140; // center Y for the quiz area (lowered to avoid truncation)
        const padding = 12;
        const spacing = 28;

        const question = 'What type of injury is currently being examined?';
        const questionStyle = { fontSize: '18px', color: '#000000', align: 'center', wordWrap: { width: quizWidth - 24 } };

        // Create question text first so we can measure it
        const questionText = this.add.text(quizX, 0, question, questionStyle).setOrigin(0.5, 0).setDepth(11);
        const questionBounds = questionText.getBounds();
        const questionHeight = questionBounds.height;

        // Choices
        const choices = ['Stab wound', 'Abrasion', 'Laceration', 'Contusion', 'Incised Wound'];
        const choicesHeight = choices.length * spacing;

        const quizHeight = padding * 2 + questionHeight + 8 + choicesHeight;

        // draw background centered at quizX, quizY
        const quizBg = this.add.rectangle(quizX, quizY, quizWidth, quizHeight, 0xffffff, 0.95);
        quizBg.setStrokeStyle(2, 0x000000, 1);
        quizBg.setDepth(10);

        // Position question text inside the bg
        const questionTop = quizY - quizHeight / 2 + padding;
        questionText.setPosition(quizX, questionTop);

        // Choice start Y (first choice top center)
        const choiceStartY = questionTop + questionHeight + 8 + spacing / 2;
        const choiceLeft = quizX - (quizWidth / 2) + 28;

        const dots: Phaser.GameObjects.Arc[] = [];
        const zones: Phaser.GameObjects.Rectangle[] = [];
        let selectedIndex = -1;

        // Tooltip (hidden initially)
        const tooltip = this.add.text(0, 0, '', { fontSize: '12px', color: '#ffffff', backgroundColor: '#000000' })
            .setPadding(6)
            .setDepth(20)
            .setVisible(false);

        // No inline text feedback; images will be used for correct/wrong feedback

        choices.forEach((choice, i) => {
            const cy = choiceStartY + i * spacing;

            // draw outer circle outline using graphics
            const outline = this.add.graphics();
            outline.lineStyle(2, 0x000000, 0.9);
            outline.strokeCircle(choiceLeft + 8, cy, 8);
            outline.setDepth(11);

            // inner dot for selected state
            const dot = this.add.circle(choiceLeft + 8, cy, 5, 0x0000ff, 1).setVisible(false).setDepth(12);
            dots.push(dot);

            // choice text
            const txt = this.add.text(choiceLeft + 24, cy, choice, { fontSize: '16px', color: '#000000' })
                .setOrigin(0, 0.5).setDepth(11);

            // interactive zone (transparent)
            const zone = this.add.rectangle(quizX, cy, quizWidth - 56, spacing, 0x000000, 0)
                .setOrigin(0.5, 0.5)
                .setDepth(11)
                .setInteractive({ useHandCursor: true });

            // pointerover -> show tooltip
            zone.on('pointerover', (pointer: Phaser.Input.Pointer) => {
                tooltip.setText(`${choice} — Click to select`);
                tooltip.setPosition(pointer.worldX + 12, pointer.worldY - 28);
                tooltip.setVisible(true);
            });
            zone.on('pointermove', (pointer: Phaser.Input.Pointer) => {
                if (tooltip.visible) {
                    tooltip.setPosition(pointer.worldX + 12, pointer.worldY - 28);
                }
            });
            zone.on('pointerout', () => {
                tooltip.setVisible(false);
            });

            // pointerdown -> select (single-choice)
            zone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                console.log(`[INPUT] quiz select=${choice} screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                selectedIndex = i;
                dots.forEach((d, idx) => d.setVisible(idx === selectedIndex));
                tooltip.setVisible(false);

                // immediate feedback removed; selection only updates radio dot
            });

            zones.push(zone);
        });

        // Submit button below the quiz
        const submitY = quizY + quizHeight / 2 + 36;
        const submitW = 140;
        const submitH = 36;
        const submitBg = this.add.rectangle(quizX, submitY, submitW, submitH, 0xffffff)
            .setOrigin(0.5, 0.5)
            .setDepth(11)
            .setStrokeStyle(2, 0x000000, 1)
            .setInteractive({ useHandCursor: true });
        const submitText = this.add.text(quizX, submitY, 'Submit', { fontSize: '16px', color: '#000000' })
            .setOrigin(0.5, 0.5).setDepth(12);

        submitBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene38_b_1] Submit clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            // No selection -> ignore
            if (selectedIndex < 0) return;

            // Disable button while showing feedback
            submitBg.disableInteractive();

            const correctIndex = choices.indexOf('Contusion');
            if (selectedIndex === correctIndex) {
                const img = this.add.image(quizX, submitY + 60, 'correct_tooltip').setDepth(2000);
                img.setScale(0.6);
                this.time.delayedCall(1500, () => {
                    img.destroy();
                    submitBg.setInteractive({ useHandCursor: true });
                    this.scene.start('scene38_b_2');
                });
            } else {
                const img = this.add.image(quizX, submitY + 60, 'wrong_tooltip').setDepth(2000);
                img.setScale(0.6);
                this.time.delayedCall(1500, () => {
                    img.destroy();
                    submitBg.setInteractive({ useHandCursor: true });
                    this.scene.start('scene38_b_2');
                });
            }
        });

        // Global pointer logging for this scene
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_1 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
