import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene25 extends Scene {
    skinChecks: Record<string, Phaser.GameObjects.Text | null> = {};
    skinTonesSelected: string | null = null;
    hairChecks: Record<string, Phaser.GameObjects.Text | null> = {};
    hairColorSelected: string | null = null;
    featureChecks: Record<string, Phaser.GameObjects.Text | null> = {};
    constructor() {
        super('Scene25');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_25');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        const title = this.add.text(800, 100, 'Scene 25', { fontSize: '28px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.4)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(10);

        // clipboard overlay on right side
        const clipboard = this.add.image(1105, 457, 'clipboard_1');
        // make clipboard    larger so it's more visible
        clipboard.setDisplaySize(700, 800);
        clipboard.setOrigin(0.5, 0.5);
        clipboard.setDepth(5);

        // Debug: show coordinates where user clicks
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            const label = this.add.text(pointer.worldX, pointer.worldY, `screen=(${Math.round(pointer.x)},${Math.round(pointer.y)})\nworld=(${Math.round(pointer.worldX)},${Math.round(pointer.worldY)})`, {
                fontSize: '14px', color: '#000000', backgroundColor: 'rgba(255,255,255,0.9)', padding: { x: 6, y: 4 }
            }).setOrigin(0.5).setDepth(1000);
            this.tweens.add({ targets: label, y: label.y - 30, alpha: 0, duration: 1200, ease: 'Cubic.easeOut', onComplete: () => label.destroy() });
        });

        // Hair color hitboxes (10x10) with radio behavior
        const hairPositions = [
            { x: 1044, y: 429.5, name: 'hairColor1' },
            { x: 1065, y: 429.5, name: 'hairColor2' },
            { x: 1089, y: 429.5, name: 'hairColor3' },
            { x: 1112, y: 429.5, name: 'hairColor4' },
            { x: 1130, y: 429.5, name: 'hairColor5' },
        ];
        hairPositions.forEach(p => {
            this.hairChecks[p.name] = null;
            const zone = this.add.zone(p.x, p.y, 10, 10).setOrigin(0.5, 0.5);
            zone.setInteractive({ useHandCursor: true });
            zone.setDepth(900);
            zone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                console.log(`[INPUT] ${p.name} click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                if (this.hairColorSelected === p.name) return;
                if (this.hairColorSelected && this.hairChecks[this.hairColorSelected]) {
                    this.hairChecks[this.hairColorSelected]?.destroy();
                    this.hairChecks[this.hairColorSelected] = null;
                }
                const check = this.add.text(p.x, p.y, '✓', { fontSize: '20px', color: '#00ff00' }).setOrigin(0.5).setDepth(1001);
                this.hairChecks[p.name] = check;
                this.hairColorSelected = p.name;
            });
        });

        // Facial/body feature hitboxes (15x15) - toggles
        const featurePositions = [
            { x: 1008, y: 484.5, name: 'scars' },
            { x: 1002, y: 512.5, name: 'mole' },
            { x: 1045, y: 541.5, name: 'birthmark' },
            { x: 1031, y: 570.5, name: 'freckles' },
            { x: 1012, y: 598.5, name: 'warts' },
            { x: 1046, y: 626.5, name: 'pockmark' },
            { x: 1015, y: 654.5, name: 'tattoo' },
            { x: 1030, y: 682.5, name: 'piercing' },
        ];
        featurePositions.forEach(p => {
            this.featureChecks[p.name] = null;
            const zone = this.add.zone(p.x, p.y, 15, 15).setOrigin(0.5, 0.5);
            zone.setInteractive({ useHandCursor: true });
            zone.setDepth(900);
            zone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                console.log(`[INPUT] ${p.name} click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                // toggle checkmark for this feature
                if (this.featureChecks[p.name]) {
                    this.featureChecks[p.name]?.destroy();
                    this.featureChecks[p.name] = null;
                } else {
                    const check = this.add.text(p.x, p.y, '✓', { fontSize: '18px', color: '#00ff00' }).setOrigin(0.5).setDepth(1001);
                    this.featureChecks[p.name] = check;
                }
            });
        });

        // Continue button: validate answers
        const continueBtn = this.add.text(800, 820, 'Continue', { fontSize: '24px', color: '#ffffff', backgroundColor: '#0066cc', padding: { x: 12, y: 8 } }).setOrigin(0.5).setDepth(1100);
        continueBtn.setInteractive({ useHandCursor: true });
        continueBtn.on('pointerdown', () => {
            const skinOk = this.skinTonesSelected === 'skinTone2';
            const hairOk = this.hairColorSelected === 'hairColor2';
            const correct = skinOk && hairOk;
            console.log(`[DEBUG] Continue clicked — skin=${this.skinTonesSelected} hair=${this.hairColorSelected} => ${correct ? 'CORRECT' : 'WRONG'}`);
            const tex = correct ? 'correct_tooltip' : 'wrong_tooltip';
            const tip = this.add.image(800, 450, tex).setDepth(1200).setAlpha(0);
            tip.setDisplaySize(540, 270);
            // fade in
            this.tweens.add({ targets: tip, alpha: 1, duration: 250 });
            // show longer, then fade out and move to next scene
            const VISIBLE_MS = 2200;
            this.time.delayedCall(VISIBLE_MS, () => {
                this.tweens.add({ targets: tip, alpha: 0, duration: 300, onComplete: () => {
                    tip.destroy();
                    this.scene.start('Scene26');
                } });
            });
        });

        // Skin tone hitboxes (5x5) with checkmarks
        const skinPositions = [
            { x: 1040, y: 404.5, name: 'skinTone1' },
            { x: 1063, y: 404.5, name: 'skinTone2' },
            { x: 1085, y: 404.5, name: 'skinTone3' },
            { x: 1107, y: 404.5, name: 'skinTone4' },
            { x: 1131, y: 404.5, name: 'skinTone5' },
        ];
        skinPositions.forEach(p => {
            this.skinChecks[p.name] = null;
            const zone = this.add.zone(p.x, p.y, 10, 10).setOrigin(0.5, 0.5);
            zone.setInteractive({ useHandCursor: true });
            zone.setDepth(900);
            zone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                console.log(`[INPUT] ${p.name} click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                // radio behavior: if already selected, keep it; otherwise clear previous and select this
                if (this.skinTonesSelected === p.name) return;
                if (this.skinTonesSelected && this.skinChecks[this.skinTonesSelected]) {
                    this.skinChecks[this.skinTonesSelected]?.destroy();
                    this.skinChecks[this.skinTonesSelected] = null;
                }
                const check = this.add.text(p.x, p.y, '✓', { fontSize: '20px', color: '#00ff00' }).setOrigin(0.5).setDepth(1001);
                this.skinChecks[p.name] = check;
                this.skinTonesSelected = p.name;
            });
        });

        // Back button removed per request

        EventBus.emit('current-scene-ready', this);
    }
}
