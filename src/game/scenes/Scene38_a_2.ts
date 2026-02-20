import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_2 extends Scene {
    constructor() {
        super('scene38_a_2');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_2') ? 'scene_38_a_2' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Debug: log pointer coordinates
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_2 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        // Quiz UI (top-center) — with top padding to avoid truncation
        const quizW = 700;
        const quizH = 320; // increased height to give more room for options + submit
        const quizX = 800;
        const quizY = 180; // padded down from very top
        // Quiz background and question (white bg, black text, black border)
        const quizBg = this.add.rectangle(quizX, quizY, quizW, quizH, 0xffffff, 0.95).setDepth(90);
        quizBg.setStrokeStyle(2, 0x000000, 1);

        const question = 'What is the main characteristic that distinguishes an incised wound from a laceration?';
        const qStyle = { fontSize: '18px', color: '#000000', align: 'center', wordWrap: { width: quizW - 24 } };
        this.add.text(quizX, quizY - quizH / 2 + 8, question, qStyle).setOrigin(0.5, 0).setDepth(92);

        const options = [
            { text: 'Clean and sharp wound edges', correct: true },
            { text: 'Wound with greater depth than length', correct: false },
            { text: 'Contused and bruised edges', correct: false }
        ];

        const optW = quizW - 48;
        const optH = 44; // taller option buttons
        const startY = quizY - quizH / 2 + 56;
        const gap = 12;

        let selectedRect: Phaser.GameObjects.Rectangle | null = null;
        const optionRects: Phaser.GameObjects.Rectangle[] = [];

        options.forEach((opt, i) => {
            const y = startY + i * (optH + gap) + optH / 2;
            // option row: white background, subtle stroke, black text
            const bgRect = this.add.rectangle(quizX, y, optW, optH, 0xffffff, 1)
                .setDepth(93)
                .setInteractive({ useHandCursor: true });
            optionRects.push(bgRect);
            bgRect.setStrokeStyle(1, 0x000000, 0.08);
            this.add.text(quizX - optW / 2 + 17, y, opt.text, { fontSize: '15px', color: '#000000' }).setOrigin(0, 0.5).setDepth(94);
            bgRect.setData('opt', opt.text);
            bgRect.setData('correct', opt.correct);
            bgRect.on('pointerdown', () => {
                if (selectedRect) selectedRect.setFillStyle(0xffffff, 1);
                bgRect.setFillStyle(0xf6f6f6, 1);
                selectedRect = bgRect;
                EventBus.emit('quiz-answer:selected', { scene: 'scene38_a_2', answer: opt.text });
                // enable submit
                submitBg.setFillStyle(0xffffff, 1);
                submitBg.setInteractive({ useHandCursor: true });
            });
        });

        // Submit button
        const submitW = 140;
        const submitH = 40;
        const submitX = quizX + quizW / 2 - submitW / 2 - 16;
        const submitY = quizY + quizH / 2 - submitH / 2 - 8;
        // Submit button styled white with black border and black text
        const submitBg = this.add.rectangle(submitX, submitY, submitW, submitH, 0xffffff, 1).setDepth(95).setStrokeStyle(2, 0x000000);
        this.add.text(submitX, submitY, 'Submit', { fontSize: '16px', color: '#000000' }).setOrigin(0.5).setDepth(96);
        submitBg.setInteractive({ useHandCursor: true });
        submitBg.disableInteractive();

        submitBg.on('pointerdown', () => {
            if (!selectedRect) return;
            const optText = (selectedRect as any).getData('opt') as string;
            const isCorrect = !!(selectedRect as any).getData('correct');
            console.log('[QUIZ] scene38_a_2 submitted:', optText);
            EventBus.emit('quiz-answer', { scene: 'scene38_a_2', answer: optText });

            // disable options and submit
            optionRects.forEach(r => r.disableInteractive());
            submitBg.disableInteractive();

            const key = isCorrect ? 'correct_tooltip' : 'wrong_tooltip';
            if (this.textures.exists(key)) {
                const tipImg = this.add.image(800, 450, key).setDepth(200);
                tipImg.setDisplaySize(420, 180);
                if (isCorrect) this.cameras.main.flash(150, 0, 255, 0);
                else this.cameras.main.flash(150, 255, 0, 0);
                this.time.delayedCall(900, () => {
                    tipImg.destroy();
                    this.scene.start('scene38_a_3');
                });
            } else {
                const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0).setDepth(199);
                const overlay = this.add.rectangle(800, 450, 460, 160, 0x000000, 0.85).setDepth(200);
                const tip = this.add.text(800, 430, isCorrect ? 'Correct' : 'Wrong', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5).setDepth(201);
                const subtitle = this.add.text(800, 470, isCorrect ? 'That is correct.' : 'That is not correct.', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(202);
                if (isCorrect) this.cameras.main.flash(150, 0, 255, 0);
                else this.cameras.main.flash(150, 255, 0, 0);
                this.time.delayedCall(900, () => {
                    blocker.destroy();
                    overlay.destroy();
                    tip.destroy();
                    subtitle.destroy();
                    this.scene.start('scene38_a_3');
                });
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
