import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene34 extends Scene {
    constructor() {
        super('Scene34');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_33');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // page background should not be clickable for navigation here

        // Conversation UI (top-middle area)
        const convW = 1120;
        const convH = 210; // increased by ~50px for text
        const convX = 800;
        const convY = 140;
        const convBg = this.add.rectangle(convX, convY, convW, convH, 0x000000, 0.7).setDepth(80);
        const convText = `Doctor, as seen, the body's whole \nback shows purplish-red \ndiscoloration and it remains even \nwhen the body is turned. \nAdditionally, the body feels very \nstiff. What stage of livor and rigor \nmortis could this be?`;
        this.add.text(convX - convW/2 + 16, convY - convH/2 + 12, convText, { fontSize: '22px', color: '#ffffff', lineSpacing: 6, wordWrap: { width: convW - 32 } }).setDepth(81).setOrigin(0,0);

        // Quiz UI (center)
        const quizW = 760;
        const quizH = 320;
        const quizX = 800;
        const quizY = 470;
        const quizBg = this.add.rectangle(quizX, quizY, quizW, quizH, 0x111111, 0.85).setDepth(85).setStrokeStyle(2, 0x444444);

        // Livor Mortis options
        const lmTitle = this.add.text(quizX - quizW/2 + 24, quizY - quizH/2 + 20, 'Livor Mortis:', { fontSize: '20px', color: '#ffffff' }).setDepth(86).setOrigin(0,0);
        const lmOptions = ['Initial Development','Full Development','Fixed Stage'];
        const lmStartY = quizY - quizH/2 + 56;
        const optionRects: Record<string, Phaser.GameObjects.Rectangle> = {};
        let selectedLM: string | null = null;

        lmOptions.forEach((label, i) => {
            const y = lmStartY + i * 36;
            const rect = this.add.rectangle(quizX - quizW/2 + 180, y, 420, 32, 0xffffff, 0.04).setDepth(86).setOrigin(0,0.5).setStrokeStyle(1, 0x666666, 0.4);
            rect.setInteractive({ useHandCursor: true });
            const txt = this.add.text(rect.x + 12, y, label, { fontSize: '18px', color: '#ffffff' }).setDepth(87).setOrigin(0,0.5);
            const key = `LM_${i}`;
            optionRects[key] = rect;
            rect.on('pointerdown', () => {
                // highlight selected (single-select within Livor group)
                Object.values(optionRects).forEach(r => r.setFillStyle(0xffffff, 0.04));
                rect.setFillStyle(0x0066cc, 0.28);
                selectedLM = label;
                console.log('[INPUT] Livor selected', label);
            });
        });

        // Rigor Mortis options
        const rmTitle = this.add.text(quizX - quizW/2 + 24, quizY - quizH/2 + 160, 'Rigor Mortis:', { fontSize: '20px', color: '#ffffff' }).setDepth(86).setOrigin(0,0);
        const rmOptions = ['Starting Rigor Mortis','Full Rigor Mortis','Secondary Flaccidity'];
        const rmStartY = quizY - quizH/2 + 196;
        const rmOptionRects: Record<string, Phaser.GameObjects.Rectangle> = {};
        let selectedRM: string | null = null;

        rmOptions.forEach((label, i) => {
            const y = rmStartY + i * 36;
            const rect = this.add.rectangle(quizX - quizW/2 + 180, y, 420, 32, 0xffffff, 0.04).setDepth(86).setOrigin(0,0.5).setStrokeStyle(1, 0x666666, 0.4);
            rect.setInteractive({ useHandCursor: true });
            const txt = this.add.text(rect.x + 12, y, label, { fontSize: '18px', color: '#ffffff' }).setDepth(87).setOrigin(0,0.5);
            const key = `RM_${i}`;
            rmOptionRects[key] = rect;
            rect.on('pointerdown', () => {
                Object.values(rmOptionRects).forEach(r => r.setFillStyle(0xffffff, 0.04));
                rect.setFillStyle(0x0066cc, 0.28);
                selectedRM = label;
                console.log('[INPUT] Rigor selected', label);
            });
        });

        // Submit button for the quiz
        const submit = this.add.text(quizX, quizY + quizH/2 - 18, 'Submit', { fontSize: '20px', color: '#ffffff', backgroundColor: '#0077cc', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(90);
        submit.setInteractive({ useHandCursor: true });
        submit.on('pointerdown', () => {
            if (!selectedLM || !selectedRM) {
                const warn = this.add.text(quizX, quizY + quizH/2 + 30, 'Please select both Livor and Rigor options', { fontSize: '16px', color: '#ff6666', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(91);
                this.tweens.add({ targets: warn, alpha: 0, duration: 1400, ease: 'Cubic.easeOut', onComplete: () => warn.destroy() });
                return;
            }
            console.log(`[QUIZ] Livor='${selectedLM}' Rigor='${selectedRM}'`);
            const correct = selectedLM === 'Fixed Stage' && selectedRM === 'Full Rigor Mortis';
            const tex = correct ? 'correct_tooltip' : 'wrong_tooltip';
            const tip = this.add.image(quizX, quizY - 80, tex).setDepth(92).setAlpha(0);
            tip.setDisplaySize(540, 270);
            this.tweens.add({ targets: tip, alpha: 1, duration: 200 });
            const VISIBLE_MS = 2200;
            this.time.delayedCall(VISIBLE_MS, () => {
                this.tweens.add({ targets: tip, alpha: 0, duration: 300, onComplete: () => tip.destroy() });
            });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
