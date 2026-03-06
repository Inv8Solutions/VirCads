import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50_a_5 extends Scene {
    constructor() {
        super('Scene50_a_5');
    }

    create() {
        if (this.textures.exists('scene_50_a_5')) {
            const bg = this.add.image(800, 450, 'scene_50_a_5');
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
        const dlgTextStr = 'Measure the length of the wound.';
        const dlgStyle = { fontSize: '22px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: dlgWidth - 32 } } as any;
        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(60);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0x2255cc, 1).setDepth(59);
        dlgBg.setStrokeStyle(4, 0x1a3a8f, 1);
        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Measurement functionality — across the scene
        const PIXELS_PER_CM = 96 / 2.54;
        let measuring = false;
        let measurementDone = false;
        let overlayActive = false;
        let measuredPx = 0;
        let measuredCm = 0;
        let doneButton: Phaser.GameObjects.Rectangle | null = null;
        let doneButtonText: Phaser.GameObjects.Text | null = null;
        let handleA: Phaser.GameObjects.Arc | null = null;
        let handleB: Phaser.GameObjects.Arc | null = null;
        let measureGraphics: Phaser.GameObjects.Graphics | null = null;
        let measureText: Phaser.GameObjects.Text | null = null;

        const sceneLeft = 0;
        const sceneRight = 1600;
        const sceneTop = 0;
        const sceneBottom = 900;

        const clampToScene = (x: number, y: number) => ({ x: Math.max(sceneLeft, Math.min(sceneRight, x)), y: Math.max(sceneTop, Math.min(sceneBottom, y)) });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (overlayActive) return;
            if (measuring) return;
            if (measurementDone) {
                measurementDone = false;
                if (measureGraphics) { measureGraphics.destroy(); measureGraphics = null; }
                if (handleA) { handleA.destroy(); handleA = null; }
                if (handleB) { handleB.destroy(); handleB = null; }
                if (measureText) { measureText.destroy(); measureText = null; }
            }
            measuring = true;
            const start = clampToScene(pointer.worldX, pointer.worldY);
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
                const pos = clampToScene(p.worldX, p.worldY);
                handleB.setPosition(pos.x, pos.y);
                updateMeasurementGraphics();
            };

            const onUp = () => {
                measuring = false;
                measurementDone = true;
                if (handleA && handleB && measureGraphics && measureText) {
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
                        doneButton = this.add.rectangle(btnX, btnY, 180, 54, 0x1a3a8f, 1)
                            .setOrigin(0.5)
                            .setDepth(300)
                            .setInteractive({ useHandCursor: true });
                        doneButtonText = this.add.text(btnX, btnY, 'Done', {
                            fontSize: '28px',
                            color: '#fff',
                            fontFamily: 'Arial'
                        }).setOrigin(0.5).setDepth(301);

                        doneButton.on('pointerdown', () => {
                            // Mark overlay active immediately so global pointer handlers ignore clicks
                            overlayActive = true;

                            // Capture final measurement before flash (handles may be destroyed by global handler otherwise)
                            let finalPx = measuredPx;
                            let finalCm = measuredCm;
                            if (handleA && handleB) {
                                const dxF = handleB.x - handleA.x;
                                const dyF = handleB.y - handleA.y;
                                const distF = Math.hypot(dxF, dyF);
                                finalPx = Math.round(distF);
                                finalCm = parseFloat((distF / PIXELS_PER_CM).toFixed(1));
                            }

                            // Add a short camera flash for emphasis, then show the result overlay
                            this.cameras.main.flash(200, 255, 255, 255);
                            this.cameras.main.once('cameraflashcomplete', () => {
                                // Disable the Done button while overlay is active
                                if (doneButton) { doneButton.disableInteractive(); doneButton.setAlpha(0.6); }

                                // Add an invisible blocker to swallow underlying input while overlay is active (non-interactive)
                                const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0)
                                    .setOrigin(0.5).setDepth(305);

                                const overlayW2 = 520;
                                const overlayH2 = 120;
                                const overlayBg2 = this.add.rectangle(800, 450, overlayW2, overlayH2, 0x2255cc, 1)
                                    .setOrigin(0.5)
                                    .setDepth(310);
                                const overlayText = this.add.text(800, 450, `Final measurement:\n${finalPx} px — ${finalCm.toFixed(1)} cm`, {
                                    fontSize: '28px',
                                    color: '#ffffff',
                                    fontFamily: 'Arial',
                                    align: 'center'
                                }).setOrigin(0.5).setDepth(311);

                                // OK button to dismiss and go to next scene
                                const okBtnX = 800;
                                const okBtnY = 520;
                                const okBtn = this.add.rectangle(okBtnX, okBtnY, 120, 44, 0x1a3a8f, 1)
                                    .setOrigin(0.5)
                                    .setDepth(312)
                                    .setInteractive({ useHandCursor: true });
                                const okBtnText = this.add.text(okBtnX, okBtnY, 'OK', { fontSize: '20px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(313);
                                okBtn.on('pointerdown', () => {
                                    blocker.destroy();
                                    overlayBg2.destroy();
                                    overlayText.destroy();
                                    okBtn.destroy();
                                    okBtnText.destroy();
                                    // clear overlay flag then navigate to next scene
                                    overlayActive = false;
                                    this.scene.start('Scene50_a_6');
                                });
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
