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
                const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0xffffff, 0.92)
                    .setOrigin(0.5)
                    .setDepth(20);
                this.add.text(dialogX, dialogY, 'With the ruler on hand, measure the length of the wound.', {
                    fontSize: '24px',
                    color: '#222',
                    fontFamily: 'Arial',
                    wordWrap: { width: dialogWidth - 32 }
                })
                    .setOrigin(0.5)
                    .setDepth(21);
        // Background image
        if (this.textures.exists('scene_40')) {
            const bg = this.add.image(800, 450, 'scene_40');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#e3f2fd');
        }

        // Measurement zone (click and drag)
        const zoneX = 800;
        const zoneY = 450;
        const zoneW = 800;
        const zoneH = 400;
        const measureZone = this.add.rectangle(zoneX, zoneY, zoneW, zoneH, 0x000000, 0)
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(10);

        let measuring = false;
        let handleA: Phaser.GameObjects.Arc | null = null;
        let handleB: Phaser.GameObjects.Arc | null = null;
        let measureGraphics: Phaser.GameObjects.Graphics | null = null;
        let measureText: Phaser.GameObjects.Text | null = null;
        let doneButton: Phaser.GameObjects.Rectangle | null = null;
        let doneButtonText: Phaser.GameObjects.Text | null = null;
        let measuredPx = 0;
        let measuredCm = 0;
        const PIXELS_PER_CM = 96 / 2.54;

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
            if (measuring) return;
            measuring = true;
            const wx = pointer.worldX;
            const wy = pointer.worldY;
            measureGraphics = this.add.graphics().setDepth(100);
            handleA = this.add.circle(wx, wy, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });
            handleB = this.add.circle(wx, wy, 8, 0xff0000).setDepth(102).setInteractive({ useHandCursor: true });
            measureText = this.add.text(wx, wy - 24, '', { fontSize: '18px', color: '#ff4444' }).setOrigin(0.5).setDepth(103);
            this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
                if (!measuring || !handleB) return;
                handleB.setPosition(p.worldX, p.worldY);
                updateMeasurementGraphics();
            });
            this.input.on('pointerup', () => {
                measuring = false;
                if (handleA && handleB && measureGraphics && measureText) {
                    updateMeasurementGraphics();
                }
                // Show Done button
                if (!doneButton) {
                    const btnX = 800;
                    const btnY = 820;
                    doneButton = this.add.rectangle(btnX, btnY, 180, 54, 0x1976d2, 0.95)
                        .setOrigin(0.5)
                        .setDepth(200)
                        .setInteractive({ useHandCursor: true });
                    doneButtonText = this.add.text(btnX, btnY, 'Done', {
                        fontSize: '28px',
                        color: '#fff',
                        fontFamily: 'Arial'
                    }).setOrigin(0.5).setDepth(201);
                    doneButton.on('pointerdown', () => {
                        // Flash effect
                        const flash = this.add.rectangle(800, 450, 1600, 900, 0xffffff, 1)
                            .setOrigin(0.5)
                            .setDepth(300);
                        this.tweens.add({
                            targets: flash,
                            alpha: 0,
                            duration: 350,
                            onComplete: () => flash.destroy()
                        });
                        // Overlay result
                        const overlayBg = this.add.rectangle(800, 450, 520, 120, 0xffffff, 0.96)
                            .setOrigin(0.5)
                            .setDepth(301);
                        const overlayText = this.add.text(800, 450, `Your measurement:\n${Math.round(measuredPx)} px — ${measuredCm.toFixed(1)} cm`, {
                            fontSize: '28px',
                            color: '#222',
                            fontFamily: 'Arial',
                            align: 'center'
                        }).setOrigin(0.5).setDepth(302);
                        // Next button (bottom right)
                        const nextBtnX = 1480;
                        const nextBtnY = 860;
                        const nextButton = this.add.rectangle(nextBtnX, nextBtnY, 180, 54, 0x388e3c, 0.95)
                            .setOrigin(0.5)
                            .setDepth(303)
                            .setInteractive({ useHandCursor: true });
                        const nextButtonText = this.add.text(nextBtnX, nextBtnY, 'Next', {
                            fontSize: '28px',
                            color: '#fff',
                            fontFamily: 'Arial'
                        }).setOrigin(0.5).setDepth(304);
                        nextButton.on('pointerdown', () => {
                            EventBus.emit('scene-switch', { from: 'Scene43', to: 'Scene44' });
                        });
                        // Hide Done button
                        if (doneButton) doneButton.destroy();
                        if (doneButtonText) doneButtonText.destroy();
                    });
                }
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
