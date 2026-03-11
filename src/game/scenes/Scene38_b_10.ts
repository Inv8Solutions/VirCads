import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_10 extends Scene {
    constructor() {
        super('scene38_b_10');
    }

    create() {
        // Use scene_38_b_10 as background
        const bg = this.add.image(800, 450, 'scene_38_b_10');
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

        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0x2255cc, 1)
            .setDepth(61);
        dlgBg.setStrokeStyle(4, 0x1a3a8f, 1);

        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Interactive area to start measurement for the specified coordinates
        const mAx = 906;
        const mAy = 215.5000305175781;
        const mBx = 1081.416748046875;
        const mBy = 434.6666870117188;
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
        let measurementStage: 'width' | 'length' = 'length';
        let widthCm: number | null = null;
        let lengthCm: number | null = null;
        const instrBg = this.add.rectangle(200, 845, 360, 48, 0x1a3a8f).setDepth(70).setStrokeStyle(2, 0xffffff, 0.5);
        const instructionText = this.add.text(200, 845, 'Measure the length', { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5).setDepth(71);

        // Persistent Done button (shown after first drag)
        const persistDoneBg = this.add.rectangle(800, 845, 80, 30, 0x1a3a8f).setDepth(210).setVisible(false).setStrokeStyle(2, 0xffffff, 0.5).setInteractive({ useHandCursor: true });
        const persistDoneText = this.add.text(800, 845, 'Done', { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5).setDepth(211).setVisible(false);

        // New behavior: click-and-drag to measure (press inside zone, drag to set endpoint)
        let isDragMeasuring = false;
        let startX = 0;
        let startY = 0;

        // calibrate per stage: length edge-to-edge = 4.2 cm, width edge-to-edge = 1.6 cm
        const PIXELS_PER_CM_LENGTH = mH / 4.2;
        const PIXELS_PER_CM_WIDTH = mW / 1.6;

        const updateMeasurementGraphics = () => {
            if (!measureGraphics || !handleA || !handleB || !measureText) return;
            measureGraphics.clear();
            measureGraphics.lineStyle(2, 0x00ff00, 1);
            measureGraphics.strokeLineShape(new Phaser.Geom.Line(handleA.x, handleA.y, handleB.x, handleB.y));
            const dx = handleB.x - handleA.x;
            const dy = handleB.y - handleA.y;
            const dist = Math.hypot(dx, dy);
            const cm = dist / (measurementStage === 'length' ? PIXELS_PER_CM_LENGTH : PIXELS_PER_CM_WIDTH);
            measureText.setText(`${cm.toFixed(1)} cm`);
            measureText.setPosition((handleA.x + handleB.x) / 2, (handleA.y + handleB.y) / 2 - 24);

        };

        measureZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const wx = pointer.worldX;
            const wy = pointer.worldY;
            console.log(`[INPUT] measurement zone dragstart screen=(${pointer.x},${pointer.y}) world=(${wx},${wy})`);

            // Reset any existing measurement
            handleA?.destroy(); handleA = null;
            handleB?.destroy(); handleB = null;
            measureGraphics?.destroy(); measureGraphics = null;
            measureText?.destroy(); measureText = null;
            this.input.off('pointermove');
            this.input.off('pointerup');

            measuring = true;
            isDragMeasuring = true;
            startX = wx;
            startY = wy;

            measureGraphics = this.add.graphics().setDepth(100);
            handleA = this.add.circle(startX, startY, 8, 0x00ff00).setDepth(102).setInteractive({ useHandCursor: true });
            handleB = this.add.circle(startX, startY, 8, 0x00ff00).setDepth(102).setInteractive({ useHandCursor: true });

            measureText = this.add.text(startX, startY - 24, '', { fontSize: '18px', color: '#00ff00' }).setOrigin(0.5).setDepth(103);

            persistDoneBg.setVisible(true);
            persistDoneText.setVisible(true);
            doneBg = persistDoneBg;
            doneText = persistDoneText;

            const pointerMoveHandler = (p: Phaser.Input.Pointer) => {
                if (!isDragMeasuring || !handleB) return;
                const cx = Phaser.Math.Clamp(p.worldX, mX, mX + mW);
                const cy = Phaser.Math.Clamp(p.worldY, mY, mY + mH);
                handleB.setPosition(cx, cy);
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
                    g.x = Phaser.Math.Clamp(dragX, mX, mX + mW);
                    g.y = Phaser.Math.Clamp(dragY, mY, mY + mH);
                    updateMeasurementGraphics();
                }
            });
        });

        persistDoneBg.on('pointerup', () => {
                if (!handleA || !handleB) return;
                // compute final measurement
                const dx = handleB.x - handleA.x;
                const dy = handleB.y - handleA.y;
                const dist = Math.hypot(dx, dy);
                const cm = dist / (measurementStage === 'length' ? PIXELS_PER_CM_LENGTH : PIXELS_PER_CM_WIDTH);

                // immediate flash feedback, then process on flash complete
                this.cameras.main.flash(200, 255, 255, 255);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
                    if (measurementStage === 'length') {
                        lengthCm = cm;
                        // teardown measurement visuals for length
                        handleA?.destroy(); handleA = null;
                        handleB?.destroy(); handleB = null;
                        measureGraphics?.destroy(); measureGraphics = null;
                        measureText?.destroy(); measureText = null;
                        persistDoneBg.setVisible(false);
                        persistDoneText.setVisible(false);
                        doneBg = null; doneText = null;
                        measuring = false;
                        isDragMeasuring = false;
                        measurementStage = 'width';
                        instructionText.setText('Now measure the width');
                        // swap background to the alternate image
                        bg.setTexture('scene_38_b_10_a');
                        return;
                    }

                    if (measurementStage === 'width') {
                        widthCm = cm;
                        // teardown measurement visuals
                        handleA?.destroy(); handleA = null;
                        handleB?.destroy(); handleB = null;
                        measureGraphics?.destroy(); measureGraphics = null;
                        measureText?.destroy(); measureText = null;
                        persistDoneBg.setVisible(false);
                        persistDoneText.setVisible(false);
                        doneBg = null; doneText = null;
                        measuring = false;
                        isDragMeasuring = false;

                        // show final overlay with both measurements and block underlying input
                        // disable measure zone as an extra safety
                        measureZone.disableInteractive();
                        // blocker should not be interactive (it was intercepting clicks in some cases)
                        const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0).setDepth(900);
                        const overlay = this.add.rectangle(800, 450, 800, 220, 0x2255cc, 1).setDepth(901).setStrokeStyle(4, 0x1a3a8f, 1);
                        const finalText = this.add.text(800, 410, `Length: ${lengthCm ? lengthCm.toFixed(1) : '—'} cm\nWidth: ${widthCm ? widthCm.toFixed(1) : '—'} cm`, { fontSize: '20px', color: '#ffffff', align: 'center' }).setOrigin(0.5).setDepth(902);
                        const okW = 120;
                        const okH = 40;
                        const okBg = this.add.rectangle(800, 500, okW, okH, 0x1a3a8f).setOrigin(0.5).setDepth(903).setStrokeStyle(2, 0xffffff, 0.5);
                        const okLabel = this.add.text(800, 500, 'OK', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(904);
                        okBg.setInteractive({ useHandCursor: true });
                        okBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                            console.log(`[Scene38_b_10] OK clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY}) — proceeding to scene38_b_11`);
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

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_10 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
