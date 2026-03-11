import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_12 extends Scene {
    constructor() {
        super('scene38_b_12');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_b_12') ? 'scene_38_b_12' : (this.textures.exists('scene_38_b_11') ? 'scene_38_b_11' : 'scene_38');
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Lab technician at top-left with dialog
        const techX = 140;
        const techY = 140;
        const tech = this.add.image(techX, techY, 'lab_tech').setDepth(60);
        tech.setDisplaySize(220, 220);

        const dlgWidth = 520;
        const techW = 220;
        const margin = 12;
        const dlgX = techX + techW / 2 + dlgWidth / 2 + margin;
        const dlgY = techY;
        const dlgPadding = 10;
        const dlgTextStr = 'I will take a picture of what you will measure';
        const dlgStyle = { fontSize: '16px', color: '#ffffff', align: 'left', wordWrap: { width: dlgWidth - 24 } };

        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(62);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;

        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.95)
            .setDepth(61).setStrokeStyle(2, 0x000000, 1);

        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Click-and-drag measurement (press to start, drag to set endpoint)
        const PIXELS_PER_CM = 96 / 2.54;
        let measuring = false;
        let isDragMeasuring = false;
        let startX = 0;
        let startY = 0;

        let handleA: Phaser.GameObjects.Arc | null = null;
        let handleB: Phaser.GameObjects.Arc | null = null;
        let measureGraphics: Phaser.GameObjects.Graphics | null = null;
        let measureText: Phaser.GameObjects.Text | null = null;

        // Fixed Done button at bottom-center, shown only while measuring
        const doneBg = this.add.rectangle(800, 845, 120, 44, 0xffffff)
            .setDepth(210).setStrokeStyle(2, 0x000000).setInteractive({ useHandCursor: true }).setVisible(false);
        const doneText = this.add.text(800, 845, 'Done', { fontSize: '18px', color: '#000000' })
            .setOrigin(0.5).setDepth(211).setVisible(false);

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
        };

        // allow measurement anywhere on the scene
        const measureZone = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0)
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(65);

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

        measureZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const wx = pointer.worldX;
            const wy = pointer.worldY;
            console.log(`[INPUT] measurement zone dragstart screen=(${pointer.x},${pointer.y}) world=(${wx},${wy})`);

            // Reset any existing measurement before starting a new one
            this.input.off('pointermove', pointerMoveHandler);
            this.input.off('pointerup', pointerUpHandler);
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
            handleA = this.add.circle(startX, startY, 8, 0x00ff00).setDepth(102).setInteractive({ useHandCursor: true });
            handleB = this.add.circle(startX, startY, 8, 0x00ff00).setDepth(102).setInteractive({ useHandCursor: true });

            measureText = this.add.text(startX, startY - 24, '', { fontSize: '18px', color: '#00ff00' }).setOrigin(0.5).setDepth(103);

            doneBg.setVisible(true);
            doneText.setVisible(true);

            this.input.on('pointermove', pointerMoveHandler);
            this.input.on('pointerup', pointerUpHandler);

            this.input.on('drag', (pointer: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
                if (obj === handleA || obj === handleB) {
                    const g = obj as Phaser.GameObjects.Arc;
                    g.x = dragX;
                    g.y = dragY;
                    updateMeasurementGraphics();
                }
            });

            doneBg.on('pointerup', () => {
                if (!handleA || !handleB) return;
                const dx = handleB.x - handleA.x;
                const dy = handleB.y - handleA.y;
                const dist = Math.hypot(dx, dy);
                const cm = dist / PIXELS_PER_CM;

                // flash and then show overlay
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
                    isDragMeasuring = false;

                    // block underlying input
                    measureZone.disableInteractive();
                    const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0).setDepth(900);
                    const overlay = this.add.rectangle(800, 450, 600, 180, 0xffffff, 0.95).setDepth(901).setStrokeStyle(2, 0x000000);
                    const finalText = this.add.text(800, 420, `${Math.round(dist)} px — ${cm.toFixed(1)} cm`, { fontSize: '20px', color: '#000000', align: 'center' }).setOrigin(0.5).setDepth(902);
                    const okBg = this.add.rectangle(800, 500, 120, 40, 0xffffff).setOrigin(0.5).setDepth(903).setStrokeStyle(2, 0x000000);
                    const okLabel = this.add.text(800, 500, 'OK', { fontSize: '18px', color: '#000000' }).setOrigin(0.5).setDepth(904);
                    okBg.setInteractive({ useHandCursor: true });
                    okBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                        console.log(`[Scene38_b_12] OK clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                        blocker.destroy();
                        overlay.destroy();
                        finalText.destroy();
                        okBg.destroy();
                        okLabel.destroy();
                        // reset measurement state
                        measuring = false;
                        isDragMeasuring = false;
                        handleA = null;
                        handleB = null;
                        measureGraphics = null;
                        measureText = null;
                        measureZone.setInteractive({ useHandCursor: true });
                        // emit measurement on EventBus before transitioning
                        EventBus.emit('measurements', { distancePx: Math.round(dist), distanceCm: cm });
                        // go to next scene
                        this.scene.start('scene38_b_13');
                    });
                });
            });
        });

        // Dashed vertical reference line from (813,218) to (814,633)
        const refLineGfx = this.add.graphics().setDepth(85);
        refLineGfx.lineStyle(2, 0xffffff, 0.85);
        const drawDashedLine12 = (x1: number, y1: number, x2: number, y2: number, dashLen = 10, gapLen = 7) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const totalDist = Math.hypot(dx, dy);
            if (totalDist === 0) return;
            const nx = dx / totalDist;
            const ny = dy / totalDist;
            let drawn = 0;
            refLineGfx.beginPath();
            while (drawn < totalDist) {
                const segEnd = Math.min(drawn + dashLen, totalDist);
                refLineGfx.moveTo(x1 + nx * drawn, y1 + ny * drawn);
                refLineGfx.lineTo(x1 + nx * segEnd, y1 + ny * segEnd);
                drawn += dashLen + gapLen;
            }
            refLineGfx.strokePath();
        };
        drawDashedLine12(813, 218, 814, 633);

        // Debug: log pointer coordinates and place a temporary marker for prompts
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const sx = Math.round(pointer.x);
            const sy = Math.round(pointer.y);
            const wx = Math.round(pointer.worldX);
            const wy = Math.round(pointer.worldY);
            console.log(`[INPUT] scene38_b_12 click screen=(${sx},${sy}) world=(${wx},${wy})`);
            EventBus.emit('debug-coordinate', { screen: { x: sx, y: sy }, world: { x: wx, y: wy } });
            const mark = this.add.circle(pointer.worldX, pointer.worldY, 6, 0xff0000).setDepth(100);
            this.time.delayedCall(1500, () => mark.destroy());
        });

        EventBus.emit('current-scene-ready', this);
    }
}

