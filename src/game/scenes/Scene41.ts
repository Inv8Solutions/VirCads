import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene41 extends Scene {
    constructor() {
        super('scene41');
    }

    create() {
        const bgKey = this.textures.exists('scene_40') ? 'scene_40' : (this.textures.exists('scene_39') ? 'scene_39' : 'scene_38');
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

       
        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene41 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        // Quiz UI — styled like dialog boxes
        const quizWidth = 600;
        const quizHeight = 260;
        const quizX = 800;
        // move quiz to bottom-middle
        const quizY = 700;

        const quizBg = this.add.rectangle(quizX, quizY, quizWidth, quizHeight, 0xffffff, 1);
        quizBg.setStrokeStyle(2, 0x000000, 1);
        quizBg.setDepth(90);

        // Top-center question dialog (matches other scenes)
        const topDlgWidth = 520;
        const topDlgHeight = 80;
        const topDlgX = 800;
        const topDlgY = 80;
        const topDlgBg = this.add.rectangle(topDlgX, topDlgY, topDlgWidth, topDlgHeight, 0xffffff, 0.95);
        topDlgBg.setStrokeStyle(2, 0x000000, 1);
        topDlgBg.setDepth(90);
        const topDlgText = this.add.text(topDlgX, topDlgY, 'What type of injury is currently being examined.', { fontFamily: 'Georgia, serif', fontSize: '22px', color: '#000000', align: 'center', wordWrap: { width: topDlgWidth - 40 } });
        topDlgText.setOrigin(0.5, 0.5);
        topDlgText.setDepth(91);

        const options = ['Stab wound', 'Abrasion', 'Laceration', 'Contusion', 'Incised wound'];
        const optionStartY = quizY - 80;
        const optionGap = 42;

        let selectedOption: string | null = null;
        const optBgs: Phaser.GameObjects.Rectangle[] = [];

        const FEEDBACK_VISIBLE_MS = 2200;
        const FEEDBACK_FADE_MS = 300;

        const showFeedback = (correct: boolean) => {
            const key = correct ? 'correct_tooltip' : 'wrong_tooltip';
            const tip = this.add.image(800, 450, key).setDepth(1200).setAlpha(0);
            tip.setDisplaySize(540, 270);
            this.tweens.add({ targets: tip, alpha: 1, duration: 250 });
            this.time.delayedCall(FEEDBACK_VISIBLE_MS, () => {
                this.tweens.add({ targets: tip, alpha: 0, duration: FEEDBACK_FADE_MS, onComplete: () => tip.destroy() });
            });
        };

        options.forEach((opt, i) => {
            const oy = optionStartY + i * optionGap;
            const optBg = this.add.rectangle(quizX, oy, quizWidth - 64, 40, 0xffffff, 1).setDepth(92).setStrokeStyle(2, 0x000000, 1);
            const optText = this.add.text(quizX - (quizWidth - 64) / 2 + 16, oy, opt, { fontFamily: 'Arial', fontSize: '20px', color: '#000000' }).setOrigin(0, 0.5).setDepth(93);
            optBg.setInteractive({ useHandCursor: true });
            optBgs.push(optBg);
            optBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                console.log(`[INPUT] scene41 quiz select='${opt}' screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
                // mark selection visually
                selectedOption = opt;
                optBgs.forEach(b => b.setFillStyle(0xffffff));
                optBg.setFillStyle(0xf6f6f6);
            });
        });

        // Submit button (lower-right)
        const submitPadding = 20;
        const submitW = 160;
        const submitH = 56;
        const submitX = 1600 - submitPadding - submitW / 2;
        const submitY = 900 - submitPadding - submitH / 2;
        const submitBg = this.add.rectangle(submitX, submitY, submitW, submitH, 0xffffff, 1).setDepth(95).setStrokeStyle(2, 0x000000, 1);
        const submitText = this.add.text(submitX, submitY, 'Submit', { fontFamily: 'Arial', fontSize: '22px', color: '#000000' }).setOrigin(0.5).setDepth(96);
        submitBg.setInteractive({ useHandCursor: true });
        submitBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene41 submit click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY}) selected=${selectedOption}`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
            if (!selectedOption) {
                // flash submit button to indicate no selection
                this.tweens.add({ targets: submitBg, alpha: 0.5, yoyo: true, duration: 160, repeat: 1 });
                return;
            }
            const correct = selectedOption === 'Stab wound';
            showFeedback(correct);
            // disable further input
            optBgs.forEach(b => b.disableInteractive());
            submitBg.disableInteractive();

            // after feedback, navigate to scene42 (explicit) or fallback to dynamic next
            this.time.delayedCall(FEEDBACK_VISIBLE_MS + FEEDBACK_FADE_MS, () => {
                if (this.scene.get('scene42')) {
                    this.scene.start('scene42');
                    return;
                }
                try {
                    const scenes = this.game.scene.scenes.map((s: Phaser.Scene) => s.scene.key);
                    const idx = scenes.indexOf(this.scene.key);
                    const nextKey = (idx >= 0 && idx < scenes.length - 1) ? scenes[idx + 1] : null;
                    if (nextKey) {
                        this.scene.start(nextKey);
                    } else {
                        console.warn('[Scene41] No next scene registered to navigate to');
                    }
                } catch (e) {
                    console.warn('[Scene41] failed to navigate to next scene', e);
                }
            });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
