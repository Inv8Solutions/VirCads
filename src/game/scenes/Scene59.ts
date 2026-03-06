import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene59 extends Scene {
    constructor() {
        super('Scene59');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Quiz UI: white rounded panel with black text
        const quizW = 760;
        const quizH = 300;
        const quizX = 800;
        const quizY = 200;
        const quizG = this.add.graphics().setDepth(400);
        quizG.fillStyle(0x1a3a8f, 1);
        quizG.fillRoundedRect(quizX - quizW / 2 - 6, quizY - quizH / 2 - 6, quizW + 12, quizH + 12, 14);
        quizG.fillStyle(0x2255cc, 1);
        quizG.fillRoundedRect(quizX - quizW / 2, quizY - quizH / 2, quizW, quizH, 12);

        const qStyle = { fontSize: '22px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: quizW - 40 } } as any;
        const qText = this.add.text(quizX, quizY - quizH / 2 + 24, 'Which of the victim’s injuries would be the primary focus in determining her cause of death?', qStyle)
            .setOrigin(0.5, 0)
            .setDepth(401);

        const options = [
            'Cuts on the palms and forearms',
            'Stab wound on the chest to the heart',
            'Contusion and laceration on the face'
        ];

        const optionStartY = quizY - quizH / 2 + 110;
        const optionSpacing = 56;

        // track selectable option backgrounds and current selection
        const optBgs: Phaser.GameObjects.Rectangle[] = [];
        let selectedIndex: number | null = null;

        options.forEach((label, idx) => {
            const y = optionStartY + idx * optionSpacing;
            const optW = quizW - 48;
            const optBg = this.add.rectangle(quizX, y, optW, 40, 0xffffff, 0.15).setDepth(402);
            optBg.setStrokeStyle(1, 0xffffff, 0.3);
            optBg.setInteractive({ useHandCursor: true });
            optBgs.push(optBg);
            const optText = this.add.text(quizX, y, label, { fontSize: '18px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: optW - 24 } } as any)
                .setOrigin(0.5)
                .setDepth(403);

            optBg.on('pointerdown', (pointer: any) => {
                const sx = Math.round(pointer.x);
                const sy = Math.round(pointer.y);
                const wx = Math.round(pointer.worldX);
                const wy = Math.round(pointer.worldY);
                console.log(`[INPUT] click screen=(${sx},${sy}) world=(${wx},${wy})`);
                console.log('Quiz selection:', label);
                // clear previous selection visuals
                optBgs.forEach((b, i) => b.setFillStyle(0xffffff, 0.15));
                // mark new selection
                optBg.setFillStyle(0xffffff, 0.45);
                selectedIndex = idx;
            });
        });

        // Submit button just below the quiz panel
        const submitY = quizY + quizH / 2 + 36;
        const submitW = 220;
        const submitH = 48;
        const submitBg = this.add.rectangle(quizX, submitY, submitW, submitH, 0x1a3a8f, 1).setDepth(420);
        submitBg.setStrokeStyle(2, 0xffffff, 0.5);
        submitBg.setInteractive({ useHandCursor: true });
        const submitText = this.add.text(quizX, submitY, 'Submit', { fontSize: '20px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(421);

        const correctIndex = 1; // 'Stab wound on the chest to the heart'
        submitBg.on('pointerdown', () => {
            console.log('[QUIZ] submit clicked, selectedIndex=', selectedIndex);
            if (selectedIndex === null) {
                console.log('[QUIZ] no answer selected');
                // brief visual cue: flash camera
                this.cameras.main.flash(200, 255, 200, 200);
                return;
            }

            const isCorrect = selectedIndex === correctIndex;
            console.log('[QUIZ] result:', isCorrect ? 'correct' : 'incorrect');

            // show simple feedback overlay
            const overlayW = 480;
            const overlayH = 140;
            const overlayBg = this.add.rectangle(800, 450, overlayW, overlayH, 0x2255cc, 1).setDepth(430);
            overlayBg.setStrokeStyle(4, 0x1a3a8f, 1);
            const msg = isCorrect ? 'Correct — focus on the stab wound to the chest.' : 'Incorrect — that would not be the primary focus.';
            const overlayText = this.add.text(800, 430, msg, { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: overlayW - 32 } } as any).setOrigin(0.5, 0).setDepth(431);
            const okBtn = this.add.rectangle(800, 510, 120, 44, 0x1a3a8f).setDepth(432).setInteractive({ useHandCursor: true });
            const okText = this.add.text(800, 510, 'OK', { fontSize: '18px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(433);
            okBtn.on('pointerdown', () => {
                overlayBg.destroy();
                overlayText.destroy();
                okBtn.destroy();
                okText.destroy();
                this.scene.start('Scene60');
            });
        });

        // Measurement removed for this scene.

        EventBus.emit('current-scene-ready', this);
    }
}
