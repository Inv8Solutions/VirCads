import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene43 extends Scene {
    constructor() {
        super('Scene43');
    }

    create() {
                // Dialog box instruction
                const dialogWidth = 520;
                const dialogHeight = 64;
                const dialogX = 800;
                const dialogY = 60;
                const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0x2255cc, 1)
                    .setOrigin(0.5)
                    .setDepth(20)
                    .setStrokeStyle(4, 0x1a3a8f, 1);
                this.add.text(dialogX, dialogY, 'With the ruler on hand, measure the length of the wound.', {
                    fontSize: '24px',
                    color: '#ffffff',
                    fontFamily: 'Arial',
                    wordWrap: { width: dialogWidth - 32 }
                })
                    .setOrigin(0.5)
                    .setDepth(21);
        // Background image
        const bg = this.add.image(672, 564, 'scene_43');
        bg.setDisplaySize(2993, 1706);
        bg.setDepth(0);

        // Measurement zone: covers background up to the top of the bottom area (y=800)
        const measureZone = this.add.rectangle(800, 400, 1600, 800, 0x000000, 0)
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(10);

        let measuring = false;
        let handleA: Phaser.GameObjects.Arc | null = null;
        let handleB: Phaser.GameObjects.Arc | null = null;
        let measureGraphics: Phaser.GameObjects.Graphics | null = null;
        let measureText: Phaser.GameObjects.Text | null = null;
        let measuredPx = 0;
        let measuredCm = 0;
        // calibrate: (833,334)→(833,465) = 3 cm
        const PIXELS_PER_CM = Math.hypot(833 - 833, 465 - 334) / 3;

        // Fixed Done button at bottom-center, shown only while measuring
        const doneButton = this.add.rectangle(800, 845, 120, 44, 0x1a3a8f)
            .setDepth(210).setStrokeStyle(2, 0xffffff, 0.5).setInteractive({ useHandCursor: true }).setVisible(false);
        const doneButtonText = this.add.text(800, 845, 'Done', { fontSize: '18px', color: '#ffffff' })
            .setOrigin(0.5).setDepth(211).setVisible(false);

        const updateMeasurementGraphics = () => {
            if (!measureGraphics || !handleA || !handleB || !measureText) return;
            measureGraphics.clear();
            measureGraphics.lineStyle(3, 0xff0000, 1);
            measureGraphics.strokeLineShape(new Phaser.Geom.Line(handleA.x, handleA.y, handleB.x, handleB.y));
            const dx = handleB.x - handleA.x;
            const dy = handleB.y - handleA.y;
            const dist = Math.hypot(dx, dy);
            const cm = dist / PIXELS_PER_CM;
            measuredPx = dist;
            measuredCm = cm;
            measureText.setText(`${Math.round(dist)} px — ${cm.toFixed(1)} cm`);
            measureText.setPosition((handleA.x + handleB.x) / 2, (handleA.y + handleB.y) / 2 - 28);
        };

        measureZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const wx = pointer.worldX;
            const wy = pointer.worldY;
            console.log(`[INPUT] measurement zone dragstart screen=(${pointer.x},${pointer.y}) world=(${wx},${wy})`);

            // Reset any existing measurement before starting a new one
            handleA?.destroy(); handleA = null;
            handleB?.destroy(); handleB = null;
            measureGraphics?.destroy(); measureGraphics = null;
            measureText?.destroy(); measureText = null;
            doneButton.setVisible(false);
            doneButtonText.setVisible(false);
            measuring = false;

            measuring = true;
            let isDragMeasuring = true;
            measureGraphics = this.add.graphics().setDepth(100);
            handleA = this.add.circle(wx, wy, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });
            handleB = this.add.circle(wx, wy, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });
            measureText = this.add.text(wx, wy - 24, '', { fontSize: '18px', color: '#ff4444' }).setOrigin(0.5).setDepth(103);

            doneButton.setVisible(true);
            doneButtonText.setVisible(true);

            const pointerMoveHandler = (p: Phaser.Input.Pointer) => {
                if (!isDragMeasuring || !handleB) return;
                handleB.setPosition(p.worldX, p.worldY);
                updateMeasurementGraphics();
            };

            const pointerUpHandler = () => {
                if (isDragMeasuring) {
                    isDragMeasuring = false;
                    if (handleA) this.input.setDraggable(handleA);
                    if (handleB) this.input.setDraggable(handleB);
                    this.input.off('pointermove', pointerMoveHandler);
                    this.input.off('pointerup', pointerUpHandler);
                }
            };

            this.input.on('pointermove', pointerMoveHandler);
            this.input.on('pointerup', pointerUpHandler);

            this.input.on('drag', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
                if (obj === handleA || obj === handleB) {
                    const g = obj as Phaser.GameObjects.Arc;
                    g.x = dragX;
                    g.y = dragY;
                    updateMeasurementGraphics();
                }
            });

            doneButton.on('pointerup', () => {
                if (!handleA || !handleB) return;
                const flash = this.add.rectangle(800, 450, 1600, 900, 0xffffff, 1)
                    .setOrigin(0.5)
                    .setDepth(300);
                this.tweens.add({
                    targets: flash,
                    alpha: 0,
                    duration: 350,
                    onComplete: () => {
                        flash.destroy();
                        handleA?.destroy(); handleA = null;
                        handleB?.destroy(); handleB = null;
                        measureGraphics?.destroy(); measureGraphics = null;
                        measureText?.destroy(); measureText = null;
                        doneButton.setVisible(false);
                        doneButtonText.setVisible(false);
                        measuring = false;
                        measureZone.disableInteractive();

                        const overlayBg = this.add.rectangle(800, 450, 520, 120, 0x2255cc, 1)
                            .setOrigin(0.5)
                            .setDepth(301);
                        const overlayText = this.add.text(800, 450, `Your measurement:\n${Math.round(measuredPx)} px — ${measuredCm.toFixed(1)} cm`, {
                            fontSize: '28px',
                            color: '#ffffff',
                            fontFamily: 'Arial',
                            align: 'center'
                        }).setOrigin(0.5).setDepth(302);
                        const nextBtnX = 1480;
                        const nextBtnY = 860;
                        const nextButton = this.add.rectangle(nextBtnX, nextBtnY, 180, 54, 0x1a3a8f, 1)
                            .setOrigin(0.5)
                            .setDepth(303)
                            .setInteractive({ useHandCursor: true });
                        const nextButtonText = this.add.text(nextBtnX, nextBtnY, 'Next', {
                            fontSize: '28px',
                            color: '#fff',
                            fontFamily: 'Arial'
                        }).setOrigin(0.5).setDepth(304);
                        nextButton.on('pointerdown', () => {
                            this.scene.start('Scene44');
                        });
                    }
                });
            });
        });

        // Log input for dev/debug
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene43 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
