import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_1 extends Scene {
    constructor() {
        super('scene38_a_1');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

       

        // Non-clickable stroke square at same coords as Scene38_b_13 hitbox
        const hitX1 = 738;
        const hitY1 = 534;
        const hitX2 = 688;
        const hitY2 = 572;
        const hx = Math.min(hitX1, hitX2);
        const hy = Math.min(hitY1, hitY2);
        const hw = Math.abs(hitX1 - hitX2);
        const hh = Math.abs(hitY1 - hitY2);
        const referenceMarker = this.add.rectangle(hx + hw / 2, hy + hh / 2, hw, hh, 0x000000, 0)
            .setDepth(10);
        referenceMarker.setStrokeStyle(3, 0x0000ff, 1);

        // Quiz UI (top-center) — expanded height
        const quizW = 760;
        const quizH = 360; // taller to fit options comfortably (adjusted)
        const quizX = 800;
        const quizY = 200; // lower so the top isn't truncated
        const quizBg = this.add.rectangle(quizX, quizY, quizW, quizH, 0x000000, 0.9).setDepth(90);
        quizBg.setStrokeStyle(2, 0xffffff, 0.08);

        const question = 'What type of injury is currently being examined.';
        const qStyle = { fontSize: '20px', color: '#ffffff', align: 'center', wordWrap: { width: quizW - 24 } };
        const qText = this.add.text(quizX, quizY - quizH / 2 + 12, question, qStyle).setOrigin(0.5, 0).setDepth(92);

        const options = [
            'Stab wound',
            'Abrasion',
            'Laceration',
            'Contusion',
            'Incised wound'
        ];

        const optW = quizW - 48;
        const optH = 40;
        const startY = quizY - quizH / 2 + 56;
        const gap = 12;

        let selectedRect: Phaser.GameObjects.Rectangle | null = null;
        const optionRects: Phaser.GameObjects.Rectangle[] = [];

        options.forEach((opt, i) => {
            const y = startY + i * (optH + gap) + optH / 2;
            const bgRect = this.add.rectangle(quizX, y, optW, optH, 0x222222, 1)
                .setDepth(93)
                .setInteractive({ useHandCursor: true });
            optionRects.push(bgRect);
            bgRect.setStrokeStyle(1, 0xffffff, 0.06);
            const label = this.add.text(quizX - optW / 2 + 12, y, opt, { fontSize: '16px', color: '#ffffff' }).setOrigin(0, 0.5).setDepth(94);
            // store option value on the rectangle for later submission
            bgRect.setData('opt', opt);
            bgRect.on('pointerdown', () => {
                // highlight selection
                if (selectedRect) {
                    selectedRect.setFillStyle(0x222222, 1);
                }
                bgRect.setFillStyle(0x0066cc, 1);
                selectedRect = bgRect;
                console.log('[QUIZ] selected (pending submit):', opt);
                EventBus.emit('quiz-answer:selected', { scene: 'scene38_a_1', answer: opt });
                // enable submit button
                submitBg.setFillStyle(0x0066cc, 1);
                submitBg.setInteractive({ useHandCursor: true });
            });
        });

        // Submit button (requires a selection)
        const submitW = 140;
        const submitH = 44;
        const submitX = quizX + quizW / 2 - submitW / 2 - 16;
        const submitY = quizY + quizH / 2 - submitH / 2 - 2; // lowered by 10px
        const submitBg = this.add.rectangle(submitX, submitY, submitW, submitH, 0x444444, 1).setDepth(95);
        const submitLabel = this.add.text(submitX, submitY, 'Submit', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(96);
        // initially disabled
        submitBg.setInteractive();
        submitBg.disableInteractive();

        submitBg.on('pointerdown', () => {
            if (!selectedRect) return;
            const opt = (selectedRect as any).getData('opt') as string;
            console.log('[QUIZ] submitted:', opt);
            EventBus.emit('quiz-answer', { scene: 'scene38_a_1', answer: opt });

            // disable all options
            optionRects.forEach(r => r.disableInteractive());
            submitBg.disableInteractive();

            const isCorrect = opt === 'Laceration';

            // show image tooltip if available, otherwise fallback to overlay text
            const key = isCorrect ? 'correct_tooltip' : 'wrong_tooltip';
            if (this.textures.exists(key)) {
                const tipImg = this.add.image(800, 450, key).setDepth(200);
                tipImg.setDisplaySize(420, 180);
                // flash camera
                if (isCorrect) {
                    this.cameras.main.flash(150, 0, 255, 0);
                } else {
                    this.cameras.main.flash(150, 255, 0, 0);
                }
                this.time.delayedCall(900, () => {
                    tipImg.destroy();
                    this.scene.start('scene38_a_2');
                });
            } else {
                const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0).setDepth(199);
                const overlay = this.add.rectangle(800, 450, 460, 160, 0x000000, 0.85).setDepth(200);
                const tip = this.add.text(800, 430, isCorrect ? 'Correct' : 'Wrong', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5).setDepth(201);
                const subtitle = this.add.text(800, 470, isCorrect ? 'That is correct.' : 'That is not correct.', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(202);
                if (isCorrect) {
                    this.cameras.main.flash(150, 0, 255, 0);
                } else {
                    this.cameras.main.flash(150, 255, 0, 0);
                }
                this.time.delayedCall(900, () => {
                    blocker.destroy();
                    overlay.destroy();
                    tip.destroy();
                    subtitle.destroy();
                    this.scene.start('scene38_a_2');
                });
            }
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_1 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
