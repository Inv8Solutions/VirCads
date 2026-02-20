import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene28 extends Scene {
    selectedOption: string | null = null;
    optionRects: Record<string, Phaser.GameObjects.Rectangle> = {};

    constructor() {
        super('Scene28');
    }

    create() {
        // use scene_27 as the background
        const bg = this.add.image(800, 450, 'scene_27');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // semi-opaque quiz window
        const winW = 920;
        const winH = 420;
        const winX = 800;
        const winY = 450;
        const winBg = this.add.rectangle(winX, winY, winW, winH, 0xffffff, 0.95).setDepth(50).setStrokeStyle(2, 0x000000, 1);

        const question = "How should the body's posterior view be documented?";
        this.add.text(winX, winY - 160, question, { fontSize: '20px', color: '#000000', align: 'center', wordWrap: { width: winW - 40 } }).setOrigin(0.5).setDepth(51);

        const options = [
            { key: 'a', text: 'Two times: with case marking positioned above and below the body' },
            { key: 'b', text: 'Four times: with case marking positioned on all sides of the body' },
            { key: 'c', text: 'Two times: with case marking placed on the left and right side of the body' },
            { key: 'd', text: "One time: document the body's posterior view as is" },
        ];

        const startY = winY - 60;
        const gap = 60;
        options.forEach((opt, i) => {
            const y = startY + i * gap;
            const rect = this.add.rectangle(winX, y, winW - 80, 48, 0xffffff, 0.06).setDepth(51).setStrokeStyle(2, 0x000000, 1);
            rect.setInteractive({ useHandCursor: true });
            const txt = this.add.text(winX - (winW - 80) / 2 + 12, y, `${opt.key}. ${opt.text}`, { fontSize: '18px', color: '#000000', wordWrap: { width: winW - 120 } }).setOrigin(0, 0.5).setDepth(52);
            rect.on('pointerdown', () => {
                this.selectOption(opt.key);
            });
            this.optionRects[opt.key] = rect;
        });

        // submit button
        const submit = this.add.text(winX, winY + winH / 2 - 28, 'Submit', { fontSize: '18px', color: '#000000', backgroundColor: '#ffffff', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(52);
        submit.setInteractive({ useHandCursor: true });
        submit.on('pointerdown', () => {
            if (!this.selectedOption) {
                const warn = this.add.text(winX, winY + winH / 2 - 28, 'Please select an option', { fontSize: '16px', color: '#ff6666', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(53);
                this.tweens.add({ targets: warn, alpha: 0, duration: 1400, ease: 'Cubic.easeOut', onComplete: () => warn.destroy() });
                return;
            }
            console.log(`[SUBMIT] selected=${this.selectedOption}`);
            const correct = this.selectedOption === 'b';
            const tex = correct ? 'correct_tooltip' : 'wrong_tooltip';
            const tip = this.add.image(winX, winY - 10, tex).setDepth(60).setAlpha(0);
            tip.setDisplaySize(560, 380);
            this.tweens.add({ targets: tip, alpha: 1, duration: 200 });
            const VISIBLE_MS = 2200;
            this.time.delayedCall(VISIBLE_MS, () => {
                this.tweens.add({ targets: tip, alpha: 0, duration: 300, onComplete: () => {
                    tip.destroy();
                    // proceed to Scene29
                    try {
                        this.scene.start('Scene29');
                    } catch (e) {
                        console.warn('[WARN] failed to start Scene29', e);
                    }
                } });
            });
        });

        // allow clicking background to also continue (optional)
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerdown', () => {
            console.log('[INPUT] Scene28 background clicked');
        });

        EventBus.emit('current-scene-ready', this);
    }

    selectOption(key: string) {
        if (this.selectedOption === key) return;
        // clear previous
        if (this.selectedOption && this.optionRects[this.selectedOption]) {
            this.optionRects[this.selectedOption].setFillStyle(0xffffff, 0.06);
        }
        // highlight new
        const r = this.optionRects[key];
        if (r) r.setFillStyle(0x000000, 0.12);
        this.selectedOption = key;
        console.log(`[INPUT] Scene28 selected option=${key}`);
    }
}
