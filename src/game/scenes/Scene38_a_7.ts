import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_7 extends Scene {
    constructor() {
        super('scene38_a_7');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_b_11') ? 'scene_38_b_11' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_7 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

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
        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogW, dialogH, 0x111111, 0.95).setOrigin(0, 0).setDepth(71);
        dialogBg.setStrokeStyle(2, 0xffffff, 0.08);
        const dialogText = this.add.text(dialogX + 12, dialogY + dialogH / 2, 'I will take a picture of what you are going to measure, Doctor.', { fontSize: '18px', color: '#ffffff', wordWrap: { width: dialogW - 24 } }).setOrigin(0, 0.5).setDepth(72);


        // bottom-center instruction dialog
        const bottomDialogW = 720;
        const bottomDialogH = 72;
        const bottomX = 800 - bottomDialogW / 2;
        const bottomY = 900 - 100;
        const bottomBg = this.add.rectangle(bottomX, bottomY, bottomDialogW, bottomDialogH, 0x111111, 0.95).setOrigin(0, 0).setDepth(80);
        bottomBg.setStrokeStyle(2, 0xffffff, 0.08);
        const bottomText = this.add.text(bottomX + 16, bottomY + bottomDialogH / 2, 'Measure the distance of the injury from the midline.', { fontSize: '20px', color: '#ffffff', wordWrap: { width: bottomDialogW - 32 } }).setOrigin(0, 0.5).setDepth(81);

        // Measurement: reuse click-and-drag flow from other scenes
        const mAx = 691;
        const mAy = 285;
        const mBx = 675;
        const mBy = 366;
        const mX = Math.min(mAx, mBx);
        const mY = Math.min(mAy, mBy);
        const mW = Math.abs(mBx - mAx) + 48;
        const mH = Math.abs(mBy - mAy) + 48;

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

        // Use same pixels->cm conversion as other scenes
        const PIXELS_PER_CM = 96 / 2.54;

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
            if (doneBg && doneText) {
                doneBg.setPosition((handleA.x + handleB.x) / 2 + 80, (handleA.y + handleB.y) / 2 + 18);
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
            handleA = this.add.circle(startX, startY, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });
            handleB = this.add.circle(startX, startY, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });

            measureText = this.add.text(startX, startY - 24, '', { fontSize: '18px', color: '#ff4444' }).setOrigin(0.5).setDepth(103);

            doneBg = this.add.rectangle(startX + 80, startY + 20, 80, 30, 0x0066cc).setDepth(104).setVisible(true).setInteractive({ useHandCursor: true });
            doneText = this.add.text(startX + 80, startY + 20, 'Done', { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5).setDepth(105).setVisible(true);
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
                    g.x = dragX;
                    g.y = dragY;
                    updateMeasurementGraphics();
                }
            });

            doneBg!.on('pointerup', () => {
                if (!handleA || !handleB) return;
                const dx = handleB.x - handleA.x;
                const dy = handleB.y - handleA.y;
                const dist = Math.hypot(dx, dy);
                const cm = dist / PIXELS_PER_CM;

                this.cameras.main.flash(200, 255, 255, 255);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
                    // teardown measurement UI
                    handleA?.destroy();
                    handleB?.destroy();
                    measureGraphics?.destroy();
                    measureText?.destroy();
                    doneBg?.destroy();
                    doneText?.destroy();
                    measureZone.setInteractive({ useHandCursor: true });
                    measuring = false;

                    // Show final overlay and emit measurement
                    const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0).setDepth(900);
                    const overlay = this.add.rectangle(800, 450, 520, 160, 0x000000, 0.85).setDepth(901);
                    const finalText = this.add.text(800, 430, `Length: ${cm.toFixed(1)} cm`, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5).setDepth(902);
                    const okW = 120;
                    const okH = 40;
                    const okBg = this.add.rectangle(800, 500, okW, okH, 0x0066cc).setOrigin(0.5).setDepth(903);
                    const okLabel = this.add.text(800, 500, 'OK', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(904);
                    okBg.setInteractive({ useHandCursor: true });
                    okBg.on('pointerdown', () => {
                        blocker.destroy();
                        overlay.destroy();
                        finalText.destroy();
                        okBg.destroy();
                        okLabel.destroy();
                        EventBus.emit('measurements', { lengthCm: cm });
                    });
                });
            });
        });

        // draw a broken/dashed vertical line from (809,196) to (809,618)
        const dashGraphics = this.add.graphics().setDepth(82);
        dashGraphics.lineStyle(2, 0xffffff, 0.9);
        dashGraphics.setScrollFactor(0);
        const drawDashedLine = (x1: number, y1: number, x2: number, y2: number, dashLen = 12, gapLen = 8) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.hypot(dx, dy);
            if (dist === 0) return;
            const nx = dx / dist;
            const ny = dy / dist;
            let drawn = 0;
            dashGraphics.beginPath();
            while (drawn < dist) {
                const start = drawn;
                const end = Math.min(drawn + dashLen, dist);
                const sx = x1 + nx * start;
                const sy = y1 + ny * start;
                const ex = x1 + nx * end;
                const ey = y1 + ny * end;
                dashGraphics.moveTo(sx, sy);
                dashGraphics.lineTo(ex, ey);
                drawn += dashLen + gapLen;
            }
            dashGraphics.strokePath();
        };

        drawDashedLine(809, 196, 809, 618, 12, 8);

        EventBus.emit('current-scene-ready', this);
    }
}
