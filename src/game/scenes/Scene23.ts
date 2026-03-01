import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene23 extends Scene {
    background!: GameObjects.Image;

    constructor() {
        super('Scene23');
    }

    create() {
        // Background
        this.background = this.add.image(800, 450, 'scene_23');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

        // Click coordinate logger
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        // Zone hitbox covering the body measurement area
        const hx1 = 257.5, hy1 = 550.5, hx2 = 1307.5, hy2 = 566.5;
        const hitW = hx2 - hx1;   // 1050
        const hitH = 60;          // tall enough to reliably click
        const hitX = (hx1 + hx2) / 2; // 782.5
        const hitY = (hy1 + hy2) / 2; // 558.5

        const hitbox = this.add.rectangle(hitX, hitY - 120, hitW, hitH * 5, 0x000000, 0.01)
            .setOrigin(0.5)
            .setDepth(10)
            .setInteractive({ useHandCursor: true });

        hitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene23 body hitbox clicked screen=(${pointer.x},${pointer.y})`);
            hitbox.disableInteractive();

            // Show body_measurement overlay image
            const imgOverlay = this.add.image(800, 450, 'body_measurement').setDepth(50);
            imgOverlay.setDisplaySize(1200, 720);

            // Calibrate so the full span from (257.5,566.5) to (1307.5,550.5) = 163 cm
            const PIXELS_PER_CM = Math.hypot(1307.5 - 257.5, 550.5 - 566.5) / 163;
            let isDragMeasuring = false;
            let handleA: Phaser.GameObjects.Arc | null = null;
            let handleB: Phaser.GameObjects.Arc | null = null;
            let measureGfx: Phaser.GameObjects.Graphics | null = null;
            let measureTxt: Phaser.GameObjects.Text | null = null;
            let doneBg: Phaser.GameObjects.Rectangle | null = null;
            let doneTxt: Phaser.GameObjects.Text | null = null;

            // Interactive zone over the overlay
            const mZone = this.add.rectangle(800, 450, 1200, 720, 0x000000, 0.01)
                .setOrigin(0.5)
                .setDepth(60)
                .setInteractive({ useHandCursor: true });

            const updateGfx = () => {
                if (!measureGfx || !handleA || !handleB || !measureTxt) return;
                measureGfx.clear();
                measureGfx.lineStyle(3, 0xff0000, 1);
                measureGfx.strokeLineShape(new Phaser.Geom.Line(handleA.x, handleA.y, handleB.x, handleB.y));
                const dx = handleB.x - handleA.x;
                const dy = handleB.y - handleA.y;
                const dist = Math.hypot(dx, dy);
                const cm = dist / PIXELS_PER_CM;
                measureTxt.setText(`${cm.toFixed(1)} cm`);
                measureTxt.setPosition((handleA.x + handleB.x) / 2, (handleA.y + handleB.y) / 2 - 28);
            };

            const pMoveHandler = (p: Phaser.Input.Pointer) => {
                if (!isDragMeasuring || !handleB) return;
                handleB.setPosition(p.worldX, p.worldY);
                updateGfx();
            };

            const pUpHandler = () => {
                if (isDragMeasuring) {
                    isDragMeasuring = false;
                    if (handleA) this.input.setDraggable(handleA);
                    if (handleB) this.input.setDraggable(handleB);
                    this.input.off('pointermove', pMoveHandler);
                    this.input.off('pointerup', pUpHandler);
                }
            };

            mZone.on('pointerdown', (ptr: Phaser.Input.Pointer) => {
                // Clean up any previous measurement before starting a new one
                handleA?.destroy(); handleA = null;
                handleB?.destroy(); handleB = null;
                measureGfx?.destroy(); measureGfx = null;
                measureTxt?.destroy(); measureTxt = null;
                doneBg?.destroy(); doneBg = null;
                doneTxt?.destroy(); doneTxt = null;
                this.input.off('pointermove', pMoveHandler);
                this.input.off('pointerup', pUpHandler);
                this.input.off('drag');
                isDragMeasuring = true;
                const wx = ptr.worldX;
                const wy = ptr.worldY;

                measureGfx = this.add.graphics().setDepth(70);
                handleA = this.add.circle(wx, wy, 8, 0xff0000).setDepth(72).setInteractive({ useHandCursor: true });
                handleB = this.add.circle(wx, wy, 8, 0xff0000).setDepth(72).setInteractive({ useHandCursor: true });
                measureTxt = this.add.text(wx, wy - 28, '', { fontSize: '18px', color: '#ff4444' }).setOrigin(0.5).setDepth(73);

                // Fixed position below the mZone (mZone bottom edge ~810), safe from capture
                doneBg = this.add.rectangle(800, 855, 100, 38, 0xffffff).setDepth(500).setStrokeStyle(2, 0x000000).setInteractive({ useHandCursor: true });
                doneTxt = this.add.text(800, 855, 'Done', { fontSize: '16px', color: '#000000' }).setOrigin(0.5).setDepth(501);

                this.input.on('pointermove', pMoveHandler);
                this.input.on('pointerup', pUpHandler);

                this.input.on('drag', (_ptr: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
                    if (obj === handleA || obj === handleB) {
                        const g = obj as Phaser.GameObjects.Arc;
                        g.x = dragX;
                        g.y = dragY;
                        updateGfx();
                    }
                });

                doneBg!.on('pointerdown', () => {
                    if (!handleA || !handleB) return;
                    const dx = handleB.x - handleA.x;
                    const dy = handleB.y - handleA.y;
                    const dist = Math.hypot(dx, dy);
                    const cm = dist / PIXELS_PER_CM;

                    this.cameras.main.flash(200, 255, 255, 255);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
                        handleA?.destroy(); handleB?.destroy();
                        measureGfx?.destroy(); measureTxt?.destroy();
                        doneBg?.destroy(); doneTxt?.destroy();
                        mZone.destroy(); // remove overlay input blocker before showing result

                        const resultBg = this.add.rectangle(800, 450, 560, 140, 0xffffff, 0.96)
                            .setDepth(300).setStrokeStyle(2, 0x000000);
                        const resultText = this.add.text(800, 430,
                            `Measurement: ${cm.toFixed(1)} cm`,  
                            { fontSize: '20px', color: '#000000', align: 'center' }
                        ).setOrigin(0.5).setDepth(301);
                        const okBg = this.add.rectangle(800, 490, 120, 40, 0xffffff)
                            .setDepth(302).setStrokeStyle(2, 0x000000).setInteractive({ useHandCursor: true });
                        const okLabel = this.add.text(800, 490, 'OK', { fontSize: '18px', color: '#000000' })
                            .setOrigin(0.5).setDepth(303);
                        okBg.on('pointerdown', () => {
                            resultBg.destroy(); resultText.destroy();
                            okBg.destroy(); okLabel.destroy();
                            imgOverlay.destroy();
                            this.scene.start('Scene24');
                        });
                    });
                });
            });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
