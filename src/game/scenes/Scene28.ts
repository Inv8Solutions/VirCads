import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene28 extends Scene {
    selectedOption: string | null = null;
    optionRects: Record<string, Phaser.GameObjects.Rectangle> = {};
    optionGfxMap: Record<string, { gfx: Phaser.GameObjects.Graphics, x: number, y: number, w: number, h: number }> = {};

    constructor() {
        super('Scene28');
    }

    create() {
        // use scene_27 as the background
        const bg = this.add.image(800, 450, 'scene_27');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // semi-opaque rounded quiz window
        const winW = 920;
        const winH = 420;
        const winX = 800;
        const winY = 450;
        const winGfx = this.add.graphics().setDepth(50);
        winGfx.fillStyle(0x1a3a8f, 1);
        winGfx.fillRoundedRect(winX - winW / 2 - 6, winY - winH / 2 - 6, winW + 12, winH + 12, 14);
        winGfx.fillStyle(0x2255cc, 1);
        winGfx.fillRoundedRect(winX - winW / 2, winY - winH / 2, winW, winH, 10);

        const question = "How should the body's posterior view be documented?";
        this.add.text(winX, winY - 160, question, { fontSize: '20px', color: '#ffffff', align: 'center', wordWrap: { width: winW - 40 } }).setOrigin(0.5).setDepth(51);

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
            const optW = winW - 80;
            const optH = 48;
            const optLeft = winX - optW / 2;
            const optTop = y - optH / 2;
            const optGfx = this.add.graphics().setDepth(51);
            optGfx.fillStyle(0xffffff, 0.12);
            optGfx.fillRoundedRect(optLeft, optTop, optW, optH, 8);
            optGfx.lineStyle(1, 0xffffff, 0.5);
            optGfx.strokeRoundedRect(optLeft, optTop, optW, optH, 8);
            this.optionGfxMap[opt.key] = { gfx: optGfx, x: optLeft, y: optTop, w: optW, h: optH };
            const rect = this.add.rectangle(winX, y, optW, optH, 0x000000, 0).setDepth(52).setInteractive({ useHandCursor: true });
            const txt = this.add.text(optLeft + 12, y, `${opt.key}. ${opt.text}`, { fontSize: '18px', color: '#ffffff', wordWrap: { width: winW - 120 } }).setOrigin(0, 0.5).setDepth(53);
            rect.on('pointerdown', () => {
                this.selectOption(opt.key);
            });
            this.optionRects[opt.key] = rect;
        });

        // submit button
        const submit = this.add.text(winX, winY + winH / 2 - 28, 'Submit', { fontSize: '18px', color: '#ffffff', backgroundColor: '#1a3a8f', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(52);
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
            tip.setDisplaySize(650, 380);
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
        if (this.selectedOption && this.optionGfxMap[this.selectedOption]) {
            const prev = this.optionGfxMap[this.selectedOption];
            prev.gfx.clear();
            prev.gfx.fillStyle(0xffffff, 0.12);
            prev.gfx.fillRoundedRect(prev.x, prev.y, prev.w, prev.h, 8);
            prev.gfx.lineStyle(1, 0xffffff, 0.5);
            prev.gfx.strokeRoundedRect(prev.x, prev.y, prev.w, prev.h, 8);
        }
        // highlight new
        const cur = this.optionGfxMap[key];
        if (cur) {
            cur.gfx.clear();
            cur.gfx.fillStyle(0xffffff, 0.35);
            cur.gfx.fillRoundedRect(cur.x, cur.y, cur.w, cur.h, 8);
            cur.gfx.lineStyle(2, 0xffffff, 1);
            cur.gfx.strokeRoundedRect(cur.x, cur.y, cur.w, cur.h, 8);
        }
        this.selectedOption = key;
        console.log(`[INPUT] Scene28 selected option=${key}`);
    }
}
