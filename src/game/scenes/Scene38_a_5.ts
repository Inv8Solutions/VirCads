import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_5 extends Scene {
    constructor() {
        super('scene38_a_5');
    }

    create() {
        const bg = this.add.image(1066, 707, 'scene_38_a_5');
        bg.setDisplaySize(4401, 2124);
        bg.setDepth(0);

        // lab tech top-left icon
        const labTech = this.add.image(24, 24, 'lab_tech').setOrigin(0, 0).setDepth(70);
        labTech.setDisplaySize(256, 256);
        labTech.setInteractive({ useHandCursor: true });
        labTech.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] lab_tech click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        // dialog to the right of lab tech
        const dialogPadding = 12;
        const dialogX = 24 + 256 + dialogPadding; // labTech x + width + padding
        const dialogY = 24;
        const dialogW = 420;
        const dialogH = 80;
        const dialogGfx = this.add.graphics().setDepth(71);
        dialogGfx.fillStyle(0x1a3a8f, 1);
        dialogGfx.fillRoundedRect(dialogX - 4, dialogY - 4, dialogW + 8, dialogH + 8, 10);
        dialogGfx.fillStyle(0x2255cc, 1);
        dialogGfx.fillRoundedRect(dialogX, dialogY, dialogW, dialogH, 8);
        const dialogText = this.add.text(dialogX + 12, dialogY + dialogH / 2, 'I will take a picture of what you are going to measure, Doctor.', { fontSize: '18px', color: '#ffffff', fontStyle: 'italic', wordWrap: { width: dialogW - 24 } }).setOrigin(0, 0.5).setDepth(72);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_5 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

            // Measurement hitbox: (583,271) → (1108,602)
            const mX = 583, mY = 271, mW = 525, mH = 331;
            // calibrate: (803,343)→(667,480) = 1.9 cm
            const refDist = Math.hypot(803 - 667, 343 - 480);
            const PIXELS_PER_CM = refDist / 1.9;

            const measureZone = this.add.rectangle(mX + mW / 2, mY + mH / 2, mW, mH, 0x000000, 0)
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true })
                .setDepth(65);

            let measuring = false;
            let handleA: Phaser.GameObjects.Arc | null = null;
            let handleB: Phaser.GameObjects.Arc | null = null;
            let measureGraphics: Phaser.GameObjects.Graphics | null = null;
            let measureText: Phaser.GameObjects.Text | null = null;

            const doneBg = this.add.rectangle(800, 845, 120, 44, 0x1a3a8f)
                .setDepth(210).setStrokeStyle(2, 0xffffff, 0.5).setInteractive({ useHandCursor: true }).setVisible(false);
            const doneText = this.add.text(800, 845, 'Done', { fontSize: '18px', color: '#ffffff' })
                .setOrigin(0.5).setDepth(211).setVisible(false);

            // drag-measure state
            let isDragMeasuring = false;
            let startX = 0;
            let startY = 0;

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

            measureZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                const wx = pointer.worldX;
                const wy = pointer.worldY;
                console.log(`[INPUT] measurement zone dragstart screen=(${pointer.x},${pointer.y}) world=(${wx},${wy})`);

                // Reset any existing measurement before starting a new one
                handleA?.destroy(); handleA = null;
                handleB?.destroy(); handleB = null;
                measureGraphics?.destroy(); measureGraphics = null;
                measureText?.destroy(); measureText = null;
                doneBg.setVisible(false);
                doneText.setVisible(false);
                measuring = false;
                isDragMeasuring = false;

                measuring = true;
                isDragMeasuring = true;
                startX = wx;
                startY = wy;

                measureGraphics = this.add.graphics().setDepth(100);
                handleA = this.add.circle(startX, startY, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });
                handleB = this.add.circle(startX, startY, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });

                measureText = this.add.text(startX, startY - 24, '', { fontSize: '18px', color: '#ff4444' }).setOrigin(0.5).setDepth(103);

                doneBg.setVisible(true);
                doneText.setVisible(true);

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
                        if (handleA) this.input.setDraggable(handleA);
                        if (handleB) this.input.setDraggable(handleB);
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

                doneBg.on('pointerup', () => {
                    if (!handleA || !handleB) return;
                    const dx = handleB.x - handleA.x;
                    const dy = handleB.y - handleA.y;
                    const dist = Math.hypot(dx, dy);
                    const cm = dist / PIXELS_PER_CM;

                    this.cameras.main.flash(200, 255, 255, 255);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
                        // teardown measurement UI
                        handleA?.destroy(); handleA = null;
                        handleB?.destroy(); handleB = null;
                        measureGraphics?.destroy(); measureGraphics = null;
                        measureText?.destroy(); measureText = null;
                        doneBg.setVisible(false);
                        doneText.setVisible(false);
                        measuring = false;
                        measureZone.disableInteractive();

                        // Show final overlay and emit measurement (blue dialog)
                        const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0).setDepth(900);
                        const overlay = this.add.rectangle(800, 450, 520, 160, 0x2255cc, 1).setDepth(901).setStrokeStyle(4, 0x1a3a8f, 1);
                        const finalText = this.add.text(800, 430, `Length: ${cm.toFixed(1)} cm`, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5).setDepth(902);
                        const okW = 120;
                        const okH = 40;
                        const okBg = this.add.rectangle(800, 500, okW, okH, 0x1a3a8f).setOrigin(0.5).setDepth(903).setStrokeStyle(2, 0xffffff, 0.5);
                        const okLabel = this.add.text(800, 500, 'Next', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(904);
                        okBg.setInteractive({ useHandCursor: true });
                        okBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                            console.log(`[Scene38_a_5] Next clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                            blocker.destroy();
                            overlay.destroy();
                            finalText.destroy();
                            okBg.destroy();
                            okLabel.destroy();
                            EventBus.emit('measurements', { lengthCm: cm });
                            try {
                                this.scene.start('scene38_a_6');
                            } catch (e) {
                                console.warn('[Scene38_a_5] failed to start scene38_a_6', e);
                            }
                        });
                    });
                });
            });

        // bottom-left instruction dialog (shifted left to leave room for Done button)
        const bottomDialogW = 640;
        const bottomDialogH = 72;
        const bottomX = 40;
        const bottomY = 900 - 100;
        const bottomGfx = this.add.graphics().setDepth(80);
        bottomGfx.fillStyle(0x1a3a8f, 1);
        bottomGfx.fillRoundedRect(bottomX - 4, bottomY - 4, bottomDialogW + 8, bottomDialogH + 8, 10);
        bottomGfx.fillStyle(0x2255cc, 1);
        bottomGfx.fillRoundedRect(bottomX, bottomY, bottomDialogW, bottomDialogH, 8);
        const bottomText = this.add.text(bottomX + 16, bottomY + bottomDialogH / 2, 'Click and drag the mouse across the wound, from one edge to the opposite edge, to measure its length.', { fontSize: '18px', color: '#ffffff', fontStyle: 'italic', wordWrap: { width: bottomDialogW - 32 } }).setOrigin(0, 0.5).setDepth(81);

        // Reset measurement when clicking outside the measurement handles / Done button
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (!measuring) return;
            const px = pointer.worldX;
            const py = pointer.worldY;
            const nearA = handleA && Phaser.Math.Distance.Between(px, py, handleA.x, handleA.y) < 16;
            const nearB = handleB && Phaser.Math.Distance.Between(px, py, handleB.x, handleB.y) < 16;
            const inDone = Math.abs(px - doneBg.x) < 70 && Math.abs(py - doneBg.y) < 28;
            if (!nearA && !nearB && !inDone) {
                handleA?.destroy(); handleA = null;
                handleB?.destroy(); handleB = null;
                measureGraphics?.destroy(); measureGraphics = null;
                measureText?.destroy(); measureText = null;
                doneBg.setVisible(false);
                doneText.setVisible(false);
                measuring = false;
                isDragMeasuring = false;
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
