import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene49 extends Scene {
    constructor() {
        super('Scene49');
    }

    create() {
        // Use scene_46 as the background for this scene if available
        if (this.textures.exists('scene_46')) {
            const bg = this.add.image(800, 450, 'scene_46');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        
        // Dialog instruction (bottom middle)
        const dlgWidth = 900;
        const dlgX = 800;
        const dlgY = 840;
        const dlgPadding = 16;
        const dlgTextStr = 'Drag the measuring tape to measure the depth of the stab wound.';
        const dlgStyle = { fontSize: '22px', color: '#222', fontFamily: 'Arial', align: 'center', wordWrap: { width: dlgWidth - 32 } };
        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(60);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.95).setDepth(59);
        dlgBg.setStrokeStyle(2, 0x222222, 0.08);
        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Add a white overlay containing the bloodied stick image
        const overlayW = 600;
        const overlayH = 400;
        const overlayX = 800;
        const overlayY = 450;

        const overlayBg = this.add.rectangle(overlayX, overlayY, overlayW, overlayH, 0xffffff, 1)
            .setDepth(200)
            .setStrokeStyle(2, 0x222222, 0.12)
            .setOrigin(0.5)
            .setInteractive(); // block input to underlying scene

        // Show bloodied_stick inside overlay, start at 80% scale and animate to full size
        if (this.textures.exists('bloodied_stick')) {
            const stick = this.add.image(overlayX, overlayY, 'bloodied_stick')
                .setDepth(201)
                .setScale(0.8)
                .setOrigin(0.5);

            this.tweens.add({
                targets: stick,
                scale: 1,
                duration: 300,
                ease: 'Sine.easeOut'
            });
        }

        // Measurement functionality — confined to the overlay area
        const PIXELS_PER_CM = 96 / 2.54;
        let measuring = false;
        let measurementDone = false; // ensure only one measurement
        let measuredPx = 0;
        let measuredCm = 0;
        let doneButton: Phaser.GameObjects.Rectangle | null = null;
        let doneButtonText: Phaser.GameObjects.Text | null = null;
        let handleA: Phaser.GameObjects.Arc | null = null;
        let handleB: Phaser.GameObjects.Arc | null = null;
        let measureGraphics: Phaser.GameObjects.Graphics | null = null;
        let measureText: Phaser.GameObjects.Text | null = null;

        const overlayLeft = overlayX - overlayW / 2;
        const overlayRight = overlayX + overlayW / 2;
        const overlayTop = overlayY - overlayH / 2;
        const overlayBottom = overlayY + overlayH / 2;

        const clampToOverlay = (x: number, y: number) => {
            return {
                x: Math.max(overlayLeft, Math.min(overlayRight, x)),
                y: Math.max(overlayTop, Math.min(overlayBottom, y))
            };
        };

        overlayBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (measuring) return;
            // If a measurement was already done, reset previous measurement objects so player can measure again
            if (measurementDone) {
                measurementDone = false;
                if (measureGraphics) { measureGraphics.destroy(); measureGraphics = null; }
                if (handleA) { handleA.destroy(); handleA = null; }
                if (handleB) { handleB.destroy(); handleB = null; }
                if (measureText) { measureText.destroy(); measureText = null; }
            }
            measuring = true;
            const start = clampToOverlay(pointer.worldX, pointer.worldY);
            measureGraphics = this.add.graphics().setDepth(250);
            handleA = this.add.circle(start.x, start.y, 6, 0xff0000).setDepth(252).setInteractive({ useHandCursor: true });
            handleB = this.add.circle(start.x, start.y, 6, 0xff0000).setDepth(252).setInteractive({ useHandCursor: true });
            measureText = this.add.text(start.x, start.y - 24, '', { fontSize: '18px', color: '#ff4444' }).setOrigin(0.5).setDepth(253);

            const updateMeasurementGraphics = () => {
                if (!measureGraphics || !handleA || !handleB || !measureText) return;
                measureGraphics.clear();
                measureGraphics.lineStyle(3, 0xff0000, 1);
                measureGraphics.strokeLineShape(new Phaser.Geom.Line(handleA.x, handleA.y, handleB.x, handleB.y));
                const dx = handleB.x - handleA.x;
                const dy = handleB.y - handleA.y;
                const dist = Math.hypot(dx, dy);
                const cm = dist / PIXELS_PER_CM;
                measureText.setText(`${Math.round(dist)} px — ${cm.toFixed(1)} cm`);
                measureText.setPosition((handleA.x + handleB.x) / 2, (handleA.y + handleB.y) / 2 - 28);
            };

            const onMove = (p: Phaser.Input.Pointer) => {
                if (!measuring || !handleB) return;
                const pos = clampToOverlay(p.worldX, p.worldY);
                handleB.setPosition(pos.x, pos.y);
                updateMeasurementGraphics();
            };

            const onUp = () => {
                measuring = false;
                measurementDone = true;
                if (handleA && handleB && measureGraphics && measureText) {
                    // final update
                    const dx = handleB.x - handleA.x;
                    const dy = handleB.y - handleA.y;
                    const dist = Math.hypot(dx, dy);
                    const cm = dist / PIXELS_PER_CM;
                    measuredPx = Math.round(dist);
                    measuredCm = parseFloat(cm.toFixed(1));
                    measureText.setText(`${measuredPx} px — ${measuredCm.toFixed(1)} cm`);

                    // Show Done button (bottom center)
                    if (!doneButton) {
                        const btnX = 800;
                        const btnY = 820;
                        doneButton = this.add.rectangle(btnX, btnY, 180, 54, 0x1976d2, 0.95)
                            .setOrigin(0.5)
                            .setDepth(300)
                            .setInteractive({ useHandCursor: true });
                        doneButtonText = this.add.text(btnX, btnY, 'Done', {
                            fontSize: '28px',
                            color: '#fff',
                            fontFamily: 'Arial'
                        }).setOrigin(0.5).setDepth(301);

                        doneButton.on('pointerdown', () => {
                            // Disable main overlay interactivity so result OK is clickable
                            overlayBg.disableInteractive();
                            // Show result overlay
                            const overlayW2 = 520;
                            const overlayH2 = 120;
                            const overlayBg2 = this.add.rectangle(800, 450, overlayW2, overlayH2, 0xffffff, 0.96)
                                .setOrigin(0.5)
                                .setDepth(310);
                            const overlayText = this.add.text(800, 450, `Final measurement:\n${measuredPx} px — ${measuredCm.toFixed(1)} cm`, {
                                fontSize: '28px',
                                color: '#222',
                                fontFamily: 'Arial',
                                align: 'center'
                            }).setOrigin(0.5).setDepth(311);

                            // OK button to dismiss the result overlay
                            const okBtnX = 800;
                            const okBtnY = 520;
                            const okBtn = this.add.rectangle(okBtnX, okBtnY, 120, 44, 0x388e3c, 0.95)
                                .setOrigin(0.5)
                                .setDepth(312)
                                .setInteractive({ useHandCursor: true });
                            const okBtnText = this.add.text(okBtnX, okBtnY, 'OK', { fontSize: '20px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(313);
                            okBtn.on('pointerdown', () => {
                                overlayBg2.destroy();
                                overlayText.destroy();
                                okBtn.destroy();
                                okBtnText.destroy();
                                this.scene.start('Scene50');
                            });
                        });
                    }
                }
                this.input.off('pointermove', onMove);
                this.input.off('pointerup', onUp);
            };

            this.input.on('pointermove', onMove);
            this.input.on('pointerup', onUp);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
