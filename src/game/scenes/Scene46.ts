import { Scene } from 'phaser';
import { EventBus } from '../EventBus';


export class Scene46 extends Scene {
    private nextBtn?: Phaser.GameObjects.Rectangle;
    private nextBtnText?: Phaser.GameObjects.Text;
    constructor() {
        super('Scene46');
    }

    create() {
                                // Dialog box instruction (bottom middle)
                                const dlgWidth = 800;
                                const dlgX = 800;
                                const dlgY = 840;
                                const dlgPadding = 16;
                                const dlgTextStr = 'Gently insert the Autopsy Probe Stick inside the stab wound to determine the force direction and depth of the Injury';
                                const dlgStyle = { fontSize: '22px', color: '#222', fontFamily: 'Arial', align: 'center', wordWrap: { width: dlgWidth - 32 } };
                                const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(60);
                                const dlgBounds = dlgText.getBounds();
                                const dlgHeight = dlgPadding * 2 + dlgBounds.height;
                                const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.92)
                                    .setDepth(59);
                                dlgBg.setStrokeStyle(2, 0x222222, 0.08);
                                const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
                                dlgText.setPosition(dlgX, dlgTop);
                        // Set probing stick cursor using direct image path
                        const probingStickCursorUrl = 'src/gameassets/probing_stick.png';

        // Set cursor for entire background
        const setCursorForBackground = () => {
            console.log('[DEBUG] Setting probing stick cursor for entire background');
            const gameCanvas = this.sys.game.canvas;
            if (gameCanvas) {
                // Test with crosshair first, then try custom cursor
                gameCanvas.style.cursor = 'crosshair';
                gameCanvas.style.setProperty('cursor', 'crosshair', 'important');
                
                // Try loading custom cursor
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = 96;
                    canvas.height = 96;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, 96, 96);
                        const dataUrl = canvas.toDataURL();
                        gameCanvas.style.cursor = `url(${dataUrl}) 48 48, crosshair`;
                        gameCanvas.style.setProperty('cursor', `url(${dataUrl}) 48 48, crosshair`, 'important');
                    }
                };
                img.src = probingStickCursorUrl;
            }
        };
        setCursorForBackground();
                // Transparent hitbox for stabbing action
                const stabX1 = 882;
                const stabY1 = 463.5;
                const stabX2 = 922;
                const stabY2 = 579.5;
                const stabWidth = Math.abs(stabX2 - stabX1);
                const stabHeight = Math.abs(stabY2 - stabY1);
                const stabCenterX = (stabX1 + stabX2) / 2;
                const stabCenterY = (stabY1 + stabY2) / 2;
        const stabHitbox = this.add.rectangle(stabCenterX, stabCenterY, stabWidth, stabHeight, 0x000000, 0)
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive({ useHandCursor: false });

        stabHitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Stabbing animation/effect: quick red flash and sound (if available)
            const flash = this.add.rectangle(stabCenterX, stabCenterY, stabWidth, stabHeight, 0xff0000, 0.35)
                .setOrigin(0.5)
                .setDepth(101);
            this.tweens.add({
                targets: flash,
                alpha: 0,
                duration: 180,
                onComplete: () => flash.destroy()
            });
            // Optionally: emit an event or log
            console.log('[ACTION] Stab performed at', stabCenterX, stabCenterY);
            EventBus.emit('stab-action', { x: stabCenterX, y: stabCenterY });

            // Show Next button (bottom right)
            if (!this.nextBtn) {
                const nextBtnX = 1480;
                const nextBtnY = 860;
                this.nextBtn = this.add.rectangle(nextBtnX, nextBtnY, 180, 54, 0x388e3c, 0.95)
                    .setOrigin(0.5)
                    .setDepth(200)
                    .setInteractive({ useHandCursor: true });
                this.nextBtnText = this.add.text(nextBtnX, nextBtnY, 'Next', {
                    fontSize: '28px',
                    color: '#fff',
                    fontFamily: 'Arial'
                }).setOrigin(0.5).setDepth(201);
                this.nextBtn.on('pointerdown', () => {
                    this.scene.start('Scene47');
                });
            }
        });
        // Background image: scene_46.png
        if (this.textures.exists('scene_46')) {
            const bg = this.add.image(800, 450, 'scene_46');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#fffbe7');
        }

        // (No global pointerdown: only the hitbox is interactive)

        // Reset cursor on scene shutdown
        this.events.once('shutdown', () => {
            const gameCanvas = this.sys.game.canvas;
            if (gameCanvas) {
                gameCanvas.style.cursor = '';
                gameCanvas.style.removeProperty('cursor');
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
