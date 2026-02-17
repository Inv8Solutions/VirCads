import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_10 extends Scene {
    constructor() {
        super('scene38_b_10');
    }

    create() {
        // Use scene_38_b_8 as background
        const bg = this.add.image(800, 450, 'scene_38_b_8');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // Lab technician at top-left
        const techX = 140;
        const techY = 140;
        const tech = this.add.image(techX, techY, 'lab_tech').setDepth(60);
        tech.setDisplaySize(220, 220);

        // Dialog to the right end of the lab tech image
        const dlgWidth = 520;
        const techW = 220;
        const margin = 12;
        const dlgX = techX + techW / 2 + dlgWidth / 2 + margin;
        const dlgY = techY;
        const dlgPadding = 10;
        const dlgTextStr = 'I will take a picture of what you are going to measure doctor';
        const dlgStyle = { fontSize: '16px', color: '#ffffff', align: 'left', wordWrap: { width: dlgWidth - 24 } };

        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(62);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;

        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0x000000, 0.92)
            .setDepth(61);
        dlgBg.setStrokeStyle(2, 0xffffff, 0.08);

        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Interactive area to start measurement for the specified coordinates
        const mAx = 529.6250305175781;
        const mAy = 289.5000305175781;
        const mBx = 924.416748046875;
        const mBy = 593.6666870117188;
        const mX = Math.min(mAx, mBx);
        const mY = Math.min(mAy, mBy);
        const mW = Math.abs(mBx - mAx);
        const mH = Math.abs(mBy - mAy);

        const measureZone = this.add.rectangle(mX + mW / 2, mY + mH / 2, mW, mH, 0x000000, 0)
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(65);

        let measuring = false;
        let handleA: Phaser.GameObjects.Arc | null = null;
        let handleB: Phaser.GameObjects.Arc | null = null;
        let measureGraphics: Phaser.GameObjects.Graphics | null = null;
        let measureText: Phaser.GameObjects.Text | null = null;
        let doneBg: Phaser.GameObjects.Rectangle | null = null;
        let doneText: Phaser.GameObjects.Text | null = null;
        let measurementStage: 'width' | 'length' = 'width';
        let widthCm: number | null = null;
        let lengthCm: number | null = null;
        const instructionText = this.add.text(800, 220, 'Measure the width', { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5).setDepth(70);

        // New behavior: click-and-drag to measure (press inside zone, drag to set endpoint)
        let isDragMeasuring = false;
        let startX = 0;
        let startY = 0;

        // pixels -> cm conversion (default, can be calibrated elsewhere)
        const PIXELS_PER_CM = 96 / 2.54;

        const updateMeasurementGraphics = () => {
            if (!measureGraphics || !handleA || !handleB || !measureText) return;
            measureGraphics.clear();
            measureGraphics.lineStyle(2, 0x00ff00, 1);
            measureGraphics.strokeLineShape(new Phaser.Geom.Line(handleA.x, handleA.y, handleB.x, handleB.y));
            const dx = handleB.x - handleA.x;
            const dy = handleB.y - handleA.y;
            const dist = Math.hypot(dx, dy);
            const cm = dist / PIXELS_PER_CM;
            measureText.setText(`${Math.round(dist)} px — ${cm.toFixed(1)} cm`);
            measureText.setPosition((handleA.x + handleB.x) / 2, (handleA.y + handleB.y) / 2 - 24);
            if (doneBg && doneText) {
                doneBg.setPosition((handleA.x + handleB.x) / 2 + 60, (handleA.y + handleB.y) / 2 + 20);
                doneText.setPosition(doneBg.x, doneBg.y);
            }
        };

        measureZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const wx = pointer.worldX;
            const wy = pointer.worldY;
            console.log(`[INPUT] measurement zone dragstart screen=(${pointer.x},${pointer.y}) world=(${wx},${wy})`);
            if (measuring) return;

            measuring = true;
            isDragMeasuring = true;
            startX = wx;
            startY = wy;

            measureGraphics = this.add.graphics().setDepth(100);
            handleA = this.add.circle(startX, startY, 8, 0x00ff00).setDepth(102).setInteractive({ useHandCursor: true });
            handleB = this.add.circle(startX, startY, 8, 0x00ff00).setDepth(102).setInteractive({ useHandCursor: true });

            measureText = this.add.text(startX, startY - 24, '', { fontSize: '18px', color: '#00ff00' }).setOrigin(0.5).setDepth(103);

            doneBg = this.add.rectangle(startX + 60, startY + 20, 80, 30, 0x0066cc).setDepth(104).setVisible(true).setInteractive({ useHandCursor: true });
            doneText = this.add.text(startX + 60, startY + 20, 'Done', { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5).setDepth(105).setVisible(true);
            // ensure Done is above handles/graphics and that the measure zone doesn't intercept clicks
            doneBg.setDepth(210);
            doneText.setDepth(211);
            measureZone.disableInteractive();

            const pointerMoveHandler = (p: Phaser.Input.Pointer) => {
                if (!isDragMeasuring || !handleB) return;
                handleB.setPosition(p.worldX, p.worldY);
                updateMeasurementGraphics();
            };

            const pointerUpHandler = (p: Phaser.Input.Pointer) => {
                    if (isDragMeasuring) {
                    isDragMeasuring = false;
                    // make handles draggable for fine adjustment (guard against null)
                    if (handleA) this.input.setDraggable(handleA);
                    if (handleB) this.input.setDraggable(handleB);
                    // remove temporary listeners
                    this.input.off('pointermove', pointerMoveHandler);
                    this.input.off('pointerup', pointerUpHandler);
                }
            };

            this.input.on('pointermove', pointerMoveHandler);
            this.input.on('pointerup', pointerUpHandler);

            // allow dragging handles after initial placement
            this.input.on('drag', (pointer: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
                if (obj === handleA || obj === handleB) {
                    const g = obj as Phaser.GameObjects.Arc;
                    g.x = dragX;
                    g.y = dragY;
                    updateMeasurementGraphics();
                }
            });

            doneBg!.on('pointerup', () => {
                if (!handleA || !handleB) return;
                // compute final measurement
                const dx = handleB.x - handleA.x;
                const dy = handleB.y - handleA.y;
                const dist = Math.hypot(dx, dy);
                const cm = dist / PIXELS_PER_CM;

                // immediate flash feedback, then process on flash complete
                this.cameras.main.flash(200, 255, 255, 255);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
                    if (measurementStage === 'width') {
                        widthCm = cm;
                        // teardown measurement UI for width
                        handleA?.destroy();
                        handleB?.destroy();
                        measureGraphics?.destroy();
                        measureText?.destroy();
                        doneBg?.destroy();
                        doneText?.destroy();
                        // re-enable measure zone for next stage
                        measureZone.setInteractive({ useHandCursor: true });
                        measuring = false;
                        isDragMeasuring = false;
                        measurementStage = 'length';
                        instructionText.setText('Now measure the length');
                        return;
                    }

                    if (measurementStage === 'length') {
                        lengthCm = cm;
                        // teardown measurement UI
                        handleA?.destroy();
                        handleB?.destroy();
                        measureGraphics?.destroy();
                        measureText?.destroy();
                        doneBg?.destroy();
                        doneText?.destroy();
                        // re-enable measure zone (not strictly necessary here but keeps state consistent)
                        measureZone.setInteractive({ useHandCursor: true });
                        measuring = false;
                        isDragMeasuring = false;

                        // show final overlay with both measurements and block underlying input
                        // disable measure zone as an extra safety
                        measureZone.disableInteractive();
                        // blocker should not be interactive (it was intercepting clicks in some cases)
                        const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0).setDepth(900);
                        const overlay = this.add.rectangle(800, 450, 800, 220, 0x000000, 0.85).setDepth(901);
                        const finalText = this.add.text(800, 410, `Width: ${widthCm ? widthCm.toFixed(1) : '—'} cm\nLength: ${lengthCm.toFixed(1)} cm`, { fontSize: '20px', color: '#ffffff', align: 'center' }).setOrigin(0.5).setDepth(902);
                        const okW = 120;
                        const okH = 40;
                        const okBg = this.add.rectangle(800, 500, okW, okH, 0x0066cc).setOrigin(0.5).setDepth(903);
                        const okLabel = this.add.text(800, 500, 'OK', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(904);
                        okBg.setInteractive({ useHandCursor: true });
                        okBg.on('pointerdown', () => {
                            console.log('[INPUT] overlay OK clicked — proceeding to scene38_b_11');
                            // flash on OK then proceed to next scene
                            this.cameras.main.flash(150, 255, 255, 255);
                            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
                                // remove blocker and overlay visuals then go to next scene
                                blocker.destroy();
                                overlay.destroy();
                                finalText.destroy();
                                okBg.destroy();
                                okLabel.destroy();
                                // emit measurements on the EventBus for other systems to consume
                                EventBus.emit('measurements', { widthCm, lengthCm });
                                this.scene.start('scene38_b_11');
                            });
                        });
                    }
                });
            });
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_10 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
