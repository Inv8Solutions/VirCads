import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene23 extends Scene {
    background!: GameObjects.Image;
    textBox!: GameObjects.Text;
    flashOverlay!: GameObjects.Rectangle;
    // Ruler tool fields
    graphics!: Phaser.GameObjects.Graphics;
    measuring = false;
    rulerStart: { x: number; y: number } | null = null;
    rulerOverlay?: Phaser.GameObjects.Rectangle;
    rulerInfo?: GameObjects.Text;
    rulerInstruction?: GameObjects.Text;
    rulerBack?: GameObjects.Text;
    // default px->cm conversion (can be calibrated elsewhere)
    PIXELS_PER_CM = 96 / 2.54;
    continueBtn?: GameObjects.Text;

    constructor() {
        super('Scene23');
    }

    create() {
        // Background that fits the screen
        this.background = this.add.image(800, 450, 'scene_23');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

        

        

        // Click listener for navigation and logging — return to Scene1
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            
        });

        // Small 10x10 hitbox at (407,452.5) that opens the ruler simulation (Scene24)
        const rulerHitbox = this.add.zone(407, 452.5, 10, 10).setOrigin(0.5, 0.5);
        rulerHitbox.setInteractive({ useHandCursor: true });
        rulerHitbox.setDepth(1000);
        // Visual marker so user sees where to start the measurement
        this.add.circle(407, 452.5, 12, 0x00ff00, 0.6).setDepth(999);
        console.log('[DEBUG] Scene23 ruler hitbox created at (407,452.5) size=10x10');
        rulerHitbox.on('pointerdown', (pointer: Phaser.Input.Pointer, localX?: number, localY?: number, event?: any) => {
            if (event && typeof event.stopPropagation === 'function') {
                event.stopPropagation();
            }
            console.log(`[INPUT] ruler hitbox click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            // Activate ruler tool in this scene
            if (this.measuring) return;
            this.measuring = true;

            // calibrate pixels-per-cm so the known start/end map to ~138.5 cm
            try {
                const refPx = Phaser.Math.Distance.Between(407, 452.5, 1143, 450.5);
                const targetCm = 138.5; // target mid-point value for 137-140
                this.PIXELS_PER_CM = refPx / targetCm;
                console.log(`[CALIBRATE] Scene23 refPx=${refPx.toFixed(2)} -> PIXELS_PER_CM=${this.PIXELS_PER_CM.toFixed(3)}`);
            } catch (e) {
                console.warn('[CALIBRATE] Scene23 failed to compute refPx, using default PIXELS_PER_CM', e);
            }

            // overlay and graphics
            this.rulerOverlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.25).setDepth(500);
            this.graphics = this.add.graphics().setDepth(510);

            // UI
            this.rulerInstruction = this.add.text(20, 20, 'Ruler: click-drag to measure. Click Back to exit.', { fontSize: '18px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setDepth(520);
            this.rulerInfo = this.add.text(20, 60, 'Distance: —', { fontSize: '20px', color: '#ffff00' }).setDepth(520);
            this.rulerBack = this.add.text(1520, 20, 'Back', { fontSize: '20px', color: '#00ff00', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setDepth(520);
            this.rulerBack.setInteractive({ useHandCursor: true });
            this.rulerBack.on('pointerdown', () => {
                // teardown ruler UI
                this.measuring = false;
                this.rulerStart = null;
                this.graphics.clear();
                this.rulerOverlay?.destroy();
                this.graphics.destroy();
                this.rulerInstruction?.destroy();
                this.rulerInfo?.destroy();
                this.rulerBack?.destroy();
                this.continueBtn?.destroy();
            });

            // start immediately at this pointer (so the initial click becomes start)
            // remove old continue button if present when starting a new measurement
            this.continueBtn?.destroy();
            this.rulerStart = { x: pointer.worldX, y: pointer.worldY };
        });

        // End hitbox at (1208,463.5) that finalizes a measurement when clicked
        const endHitbox = this.add.zone(1143, 450.5, 10, 10).setOrigin(0.5, 0.5);
        endHitbox.setInteractive({ useHandCursor: true });
        endHitbox.setDepth(1000);
        // Visual marker so user sees where to stop the measurement
        this.add.circle(1143, 450.5, 12, 0xff0000, 0.6).setDepth(999);
        console.log('[DEBUG] Scene23 end hitbox created at (1143,450.5) size=10x10');
        endHitbox.on('pointerdown', (pointer: Phaser.Input.Pointer, localX?: number, localY?: number, event?: any) => {
            if (event && typeof event.stopPropagation === 'function') {
                event.stopPropagation();
            }
            console.log(`[INPUT] end hitbox click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            if (!this.measuring || !this.rulerStart) {
                console.log('[DEBUG] end hitbox clicked but ruler not active');
                return;
            }
            if (!this.graphics) this.graphics = this.add.graphics().setDepth(510);
            this.graphics.clear();
            this.graphics.lineStyle(4, 0xff0000, 1);
            this.graphics.beginPath();
            this.graphics.moveTo(this.rulerStart.x, this.rulerStart.y);
            this.graphics.lineTo(1143, 450.5);
            this.graphics.strokePath();
            this.graphics.fillStyle(0xffffff, 1);
            this.graphics.fillCircle(this.rulerStart.x, this.rulerStart.y, 6);
            this.graphics.fillCircle(1143, 450.5, 6);

            const dist = Phaser.Math.Distance.Between(this.rulerStart.x, this.rulerStart.y, 1143, 450.5);
            const cm = dist / this.PIXELS_PER_CM;
            this.rulerInfo?.setText(`Distance: ${Math.round(dist)} px — ${cm.toFixed(1)} cm`);

            // finalize measurement (stop interactive measuring until Back pressed)
            this.measuring = false;
            this.rulerStart = null;
            // show continue button if within target range
            if (cm >= 137 && cm <= 140) {
                if (!this.continueBtn) {
                    this.continueBtn = this.add.text(800, 820, 'Continue', { fontSize: '24px', color: '#ffffff', backgroundColor: '#0066cc', padding: { x: 12, y: 8 } }).setOrigin(0.5, 0.5).setDepth(530);
                    this.continueBtn.setInteractive({ useHandCursor: true });
                    this.continueBtn.on('pointerdown', () => {
                        // flash and show large measurement briefly, then show confirmation overlay
                        const flash = this.add.rectangle(800, 450, 1600, 900, 0xffffff, 1).setDepth(545);
                        this.tweens.add({ targets: flash, alpha: 0, duration: 400, ease: 'Cubic.easeOut', onComplete: () => flash.destroy() });
                        const bigMeas = this.add.text(800, 410, `Final measurement: ${cm.toFixed(1)} cm`, { fontSize: '36px', color: '#000000', backgroundColor: 'rgba(255,255,255,0.9)', padding: { x: 14, y: 10 } }).setOrigin(0.5, 0.5).setDepth(546).setAlpha(0);
                        this.tweens.add({ targets: bigMeas, alpha: 1, scale: 1.0, from: 0.9, duration: 300, yoyo: true, hold: 700, onComplete: () => {
                            bigMeas.destroy();
                            const overlay = this.add.rectangle(800, 450, 900, 300, 0x000000, 0.85).setDepth(540);
                            const meas = this.add.text(800, 410, `Final measurement: ${cm.toFixed(1)} cm`, { fontSize: '22px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(541);
                            const proceed = this.add.text(800, 490, 'Proceed', { fontSize: '20px', color: '#ffffff', backgroundColor: '#007700', padding: { x: 12, y: 8 } }).setOrigin(0.5, 0.5).setDepth(541);
                            proceed.setInteractive({ useHandCursor: true });
                            proceed.on('pointerdown', () => {
                                overlay.destroy();
                                meas.destroy();
                                proceed.destroy();
                                this.continueBtn?.destroy();
                                this.scene.start('Scene24');
                            });
                        } });
                    });
                }
            }
        });

        // pointermove/up handlers used when measuring
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            console.log(`[DEBUG] Scene23 pointermove measuring=${this.measuring} rulerStart=${!!this.rulerStart}`);
            if (!this.measuring || !this.rulerStart) return;
            if (!this.graphics) {
                console.log('[DEBUG] Scene23 creating graphics lazily');
                this.graphics = this.add.graphics().setDepth(510);
            }
            try {
                this.graphics.clear();
            } catch (err) {
                console.error('[ERROR] Scene23 graphics.clear failed', err);
                return;
            }
            this.graphics.lineStyle(4, 0xff0000, 1);
            this.graphics.beginPath();
            this.graphics.moveTo(this.rulerStart.x, this.rulerStart.y);
            this.graphics.lineTo(pointer.worldX, pointer.worldY);
            this.graphics.strokePath();

            this.graphics.fillStyle(0xffffff, 1);
            this.graphics.fillCircle(this.rulerStart.x, this.rulerStart.y, 6);
            this.graphics.fillCircle(pointer.worldX, pointer.worldY, 6);

            const dist = Phaser.Math.Distance.Between(this.rulerStart.x, this.rulerStart.y, pointer.worldX, pointer.worldY);
            this.rulerInfo?.setText(`Distance: ${Math.round(dist)} px`);
        });

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            console.log(`[DEBUG] Scene23 pointerup measuring=${this.measuring} rulerStart=${!!this.rulerStart}`);
            if (!this.measuring || !this.rulerStart) return;
            // If user released mouse too early (not on end point), prompt to redo
            const END_X = 1143;
            const END_Y = 450.5;
            const releaseToEnd = Phaser.Math.Distance.Between(pointer.worldX, pointer.worldY, END_X, END_Y);
            const EARLY_THRESHOLD = 40; // px
            if (releaseToEnd > EARLY_THRESHOLD) {
                console.log(`[DEBUG] released too early (dist to end ${releaseToEnd.toFixed(1)}px) — prompting redo`);
                this.rulerInfo?.setText('Released too early — please redo measurement');
                // reset measuring state and clear drawings
                this.measuring = false;
                this.rulerStart = null;
                try { this.graphics?.clear(); } catch {}
                return;
            }

            if (!this.graphics) {
                this.graphics = this.add.graphics().setDepth(510);
            }
            const dist = Phaser.Math.Distance.Between(this.rulerStart.x, this.rulerStart.y, pointer.worldX, pointer.worldY);
            const cm = dist / this.PIXELS_PER_CM;
            this.rulerInfo?.setText(`Distance: ${Math.round(dist)} px — ${cm.toFixed(1)} cm`);
            // keep final drawing until Back pressed
            this.rulerStart = null;
            this.measuring = false;
            // show continue button if within target range
            if (cm >= 137 && cm <= 140) {
                if (!this.continueBtn) {
                    this.continueBtn = this.add.text(800, 820, 'Continue', { fontSize: '24px', color: '#ffffff', backgroundColor: '#0066cc', padding: { x: 12, y: 8 } }).setOrigin(0.5, 0.5).setDepth(530);
                    this.continueBtn.setInteractive({ useHandCursor: true });
                    this.continueBtn.on('pointerdown', () => {
                        // flash and show large measurement briefly, then show confirmation overlay
                        const flash = this.add.rectangle(800, 450, 1600, 900, 0xffffff, 1).setDepth(545);
                        this.tweens.add({ targets: flash, alpha: 0, duration: 400, ease: 'Cubic.easeOut', onComplete: () => flash.destroy() });
                        const bigMeas = this.add.text(800, 410, `Final measurement: ${cm.toFixed(1)} cm`, { fontSize: '36px', color: '#000000', backgroundColor: 'rgba(255,255,255,0.9)', padding: { x: 14, y: 10 } }).setOrigin(0.5, 0.5).setDepth(546).setAlpha(0);
                        this.tweens.add({ targets: bigMeas, alpha: 1, scale: 1.0, from: 0.9, duration: 300, yoyo: true, hold: 700, onComplete: () => {
                            bigMeas.destroy();
                            const overlay = this.add.rectangle(800, 450, 900, 300, 0x000000, 0.85).setDepth(540);
                            const meas = this.add.text(800, 410, `Final measurement: ${cm.toFixed(1)} cm`, { fontSize: '22px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(541);
                            const proceed = this.add.text(800, 490, 'Proceed', { fontSize: '20px', color: '#ffffff', backgroundColor: '#007700', padding: { x: 12, y: 8 } }).setOrigin(0.5, 0.5).setDepth(541);
                            proceed.setInteractive({ useHandCursor: true });
                            proceed.on('pointerdown', () => {
                                overlay.destroy();
                                meas.destroy();
                                proceed.destroy();
                                this.continueBtn?.destroy();
                                this.scene.start('Scene24');
                            });
                        } });
                    });
                }
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
