import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene35 extends Scene {
    constructor() {
        super('Scene35');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_35');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        const hint = this.add.text(800, 860, 'Click to continue', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(50);

        // remove whole-page navigation; Scene35 will show a quiz UI instead

        // Quiz UI: select injuries to document
        const panelW = 840;
        const panelH = 420;
        const panelX = 800;
        const panelY = 460;
        const panelBg = this.add.rectangle(panelX, panelY, panelW, panelH, 0x0b0b0b, 0.9).setDepth(60).setStrokeStyle(2, 0x333333);

        const intro = `You will now proceed to the examination of the visible injuries present on the body. Select the injuries that should be documented.`;
        this.add.text(panelX, panelY - panelH/2 + 32, intro, { fontSize: '20px', color: '#ffffff', wordWrap: { width: panelW - 40 } }).setOrigin(0.5, 0).setDepth(61);

        const injuries = ['Stab wound','Abrasion','Laceration','Contusion','Incised wound'];
        const startY = panelY - panelH/2 + 142; // add extra top padding before answer choices
        const optionRects: Record<string, Phaser.GameObjects.Rectangle> = {};
        const selected = new Set<string>();

        injuries.forEach((label, i) => {
            const y = startY + i * 56;
            const rect = this.add.rectangle(panelX - panelW/2 + 48, y, panelW - 96, 44, 0xffffff, 0.04).setDepth(62).setOrigin(0,0.5).setStrokeStyle(1, 0x666666, 0.4);
            rect.setInteractive({ useHandCursor: true });
            const txt = this.add.text(rect.x + 12, y, label, { fontSize: '20px', color: '#ffffff' }).setDepth(63).setOrigin(0,0.5);
            optionRects[label] = rect;
            rect.on('pointerdown', () => {
                if (selected.has(label)) {
                    selected.delete(label);
                    rect.setFillStyle(0xffffff, 0.04);
                } else {
                    selected.add(label);
                    rect.setFillStyle(0x0066cc, 0.28);
                }
                console.log('[INPUT] injury toggle', label, 'selected=', selected.has(label));
            });
        });

        const choicesEndY = startY + (injuries.length - 1) * 56;
        const submitY = choicesEndY + 56 + 12; // extra bottom padding under choices
        const submit = this.add.text(panelX, submitY, 'Submit', { fontSize: '20px', color: '#ffffff', backgroundColor: '#0077cc', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(64);
        submit.setInteractive({ useHandCursor: true });
        submit.on('pointerdown', () => {
            if (selected.size === 0) {
                const warn = this.add.text(panelX, submitY, 'Please select at least one injury', { fontSize: '16px', color: '#ff6666', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(65);
                this.tweens.add({ targets: warn, alpha: 0, duration: 1400, ease: 'Cubic.easeOut', onComplete: () => warn.destroy() });
                return;
            }
            console.log('[SUBMIT] injuries=', Array.from(selected));
            const correctSet = new Set(['Stab wound','Abrasion','Contusion','Laceration']);
            const isCorrect = selected.size === correctSet.size && Array.from(correctSet).every(s => selected.has(s));
            const tex = isCorrect ? 'correct_tooltip' : 'wrong_tooltip';
            const tip = this.add.image(panelX, submitY - 120, tex).setDepth(66).setAlpha(0);
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
