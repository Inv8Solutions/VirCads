import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_4 extends Scene {
    constructor() {
        super('scene38_b_4');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Blue bordered square at specified coordinates (same as scene38_b_1)
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
        const quizY = 140;
        const padding = 12;
        const spacing = 28;

        const question = 'How old is the contusion being examined?';
        const questionStyle = { fontSize: '18px', color: '#ffffff', align: 'center', wordWrap: { width: quizWidth - 24 } };

        const questionText = this.add.text(quizX, 0, question, questionStyle).setOrigin(0.5, 0).setDepth(11);
        const questionBounds = questionText.getBounds();
        const questionHeight = questionBounds.height;

        const choices = ['1-2 days', '4-5 days', '7-10 days', '14-15 days'];
        const choicesHeight = choices.length * spacing;
        const quizHeight = padding * 2 + questionHeight + 8 + choicesHeight;

        const quizBg = this.add.rectangle(quizX, quizY, quizWidth, quizHeight, 0x000000, 1);
        quizBg.setStrokeStyle(2, 0xffffff, 0.08);
        quizBg.setDepth(10);

        const questionTop = quizY - quizHeight / 2 + padding;
        questionText.setPosition(quizX, questionTop);

        const choiceStartY = questionTop + questionHeight + 8 + spacing / 2;
        const choiceLeft = quizX - (quizWidth / 2) + 28;

        const dots: Phaser.GameObjects.Arc[] = [];
        let selectedIndex = -1;

        const tooltip = this.add.text(0, 0, '', { fontSize: '12px', color: '#ffffff', backgroundColor: '#000000' })
            .setPadding(6)
            .setDepth(20)
            .setVisible(false);

        choices.forEach((choice, i) => {
            const cy = choiceStartY + i * spacing;

            const outline = this.add.graphics();
            outline.lineStyle(2, 0xffffff, 0.9);
            outline.strokeCircle(choiceLeft + 8, cy, 8);
            outline.setDepth(11);

            const dot = this.add.circle(choiceLeft + 8, cy, 5, 0x0000ff, 1).setVisible(false).setDepth(12);
            dots.push(dot);

            this.add.text(choiceLeft + 24, cy, choice, { fontSize: '16px', color: '#ffffff' })
                .setOrigin(0, 0.5).setDepth(11);

            const zone = this.add.rectangle(quizX, cy, quizWidth - 56, spacing, 0x000000, 0)
                .setOrigin(0.5, 0.5)
                .setDepth(11)
                .setInteractive({ useHandCursor: true });

            zone.on('pointerover', (pointer: Phaser.Input.Pointer) => {
                tooltip.setText(`${choice} — Click to select`);
                tooltip.setPosition(pointer.worldX + 12, pointer.worldY - 28);
                tooltip.setVisible(true);
            });
            zone.on('pointermove', (pointer: Phaser.Input.Pointer) => {
                if (tooltip.visible) tooltip.setPosition(pointer.worldX + 12, pointer.worldY - 28);
            });
            zone.on('pointerout', () => tooltip.setVisible(false));

            zone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                selectedIndex = i;
                dots.forEach((d, idx) => d.setVisible(idx === selectedIndex));
                tooltip.setVisible(false);
            });
        });

        // Submit button
        const submitY = quizY + quizHeight / 2 + 36;
        const submitW = 140;
        const submitH = 36;
        const submitBg = this.add.rectangle(quizX, submitY, submitW, submitH, 0x0066cc)
            .setOrigin(0.5, 0.5)
            .setDepth(11)
            .setInteractive({ useHandCursor: true });
        this.add.text(quizX, submitY, 'Submit', { fontSize: '16px', color: '#ffffff' })
            .setOrigin(0.5, 0.5).setDepth(12);

        submitBg.on('pointerdown', () => {
            if (selectedIndex < 0) return;
            submitBg.disableInteractive();
            const correctIndex = 0; // '1-2 days'
            if (selectedIndex === correctIndex) {
                const img = this.add.image(quizX, submitY + 60, 'correct_tooltip').setDepth(2000);
                img.setScale(0.6);
                this.time.delayedCall(1500, () => { img.destroy(); submitBg.setInteractive({ useHandCursor: true }); this.scene.start('scene38_b_5'); });
            } else {
                const img = this.add.image(quizX, submitY + 60, 'wrong_tooltip').setDepth(2000);
                img.setScale(0.6);
                this.time.delayedCall(1500, () => { img.destroy(); submitBg.setInteractive({ useHandCursor: true }); this.scene.start('scene38_b_5'); });
            }
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_4 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
