import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene47 extends Scene {
    private probe?: Phaser.GameObjects.Image;
    private isThrustAnimating = false;
    private nextBtn?: Phaser.GameObjects.Rectangle;
    private nextBtnText?: Phaser.GameObjects.Text;

    constructor() {
        super('Scene47');
    }

    create() {
        // Background image
        if (this.textures.exists('scene_46')) {
            const bg = this.add.image(800, 450, 'scene_46');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#222');
        }

        // Set probing stick cursor for entire canvas (same approach as Scene46)
        const probingStickCursorUrl = 'src/gameassets/probing_stick.png';
        const gameCanvas = this.sys.game.canvas;
        const setCursor = (value: string) => {
            if (gameCanvas) {
                gameCanvas.style.cursor = value;
                gameCanvas.style.setProperty('cursor', value, 'important');
            }
        };

        // Cache cursor data URL — reuse a single canvas element
        let cursorDataUrl = '';
        const cursorCanvas = document.createElement('canvas');
        cursorCanvas.width = 96;
        cursorCanvas.height = 96;

        const img = new Image();
        img.onload = () => {
            const ctx = cursorCanvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, 96, 96);
                cursorDataUrl = cursorCanvas.toDataURL();
                setCursor(`url(${cursorDataUrl}) 48 0, crosshair`);
            }
        };
        img.src = probingStickCursorUrl;

        // Hitbox (invisible) — covers wound area
        const hitboxX = (865 + 925) / 2;  // 895
        const hitboxY = (459 + 589) / 2;  // 524
        const hitboxW = 925 - 865;         // 60
        const hitboxH = 589 - 459;         // 130
        const hitbox = this.add.rectangle(hitboxX, hitboxY, hitboxW, hitboxH, 0x000000, 0)
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive({ useHandCursor: false });

        // Probe sprite — hidden by default, shown on hitbox hover
        this.probe = this.add.image(0, 0, 'probing_stick')
            .setVisible(false)
            .setDepth(200)
            .setOrigin(0.5, 0.9)  // tip at bottom of sprite
            .setScale(0.7);

        // When entering the hitbox: hide CSS cursor, show Phaser probe sprite
        hitbox.on('pointerover', (pointer: Phaser.Input.Pointer) => {
            setCursor('none');
            this.probe!.setVisible(true);
            this.probe!.setPosition(pointer.worldX, pointer.worldY);
            this.probe!.setAngle(0);
        });

        // While moving over hitbox: keep probe sprite at pointer
        hitbox.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!this.isThrustAnimating) {
                this.probe!.setPosition(pointer.worldX, pointer.worldY);
                this.probe!.setAngle(0);
            }
        });

        // When leaving hitbox: restore cached CSS cursor, hide probe sprite
        hitbox.on('pointerout', () => {
            if (cursorDataUrl) {
                setCursor(`url(${cursorDataUrl}) 48 0, crosshair`);
            } else {
                setCursor('crosshair');
            }
            this.probe!.setVisible(false);
        });

        // On click: thrust animation — probe moves toward hitbox center, then retracts
        hitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);

            if (this.isThrustAnimating) return;
            this.isThrustAnimating = true;

            // Thrust straight downwards from current pointer position and stop
            const thrustDist = 52;
            const tx = pointer.worldX;
            const ty = pointer.worldY + thrustDist;

            this.probe!.setPosition(pointer.worldX, pointer.worldY);
            this.probe!.setAngle(0);
            this.probe!.setVisible(true);

            this.tweens.add({
                targets: this.probe,
                x: tx,
                y: ty,
                angle: 0,
                duration: 140,
                ease: 'Sine.easeIn',
                // no yoyo: stop at final thrust position
                onComplete: () => {
                    this.isThrustAnimating = false;
                    // Keep probe at final thrust position (do not restore)
                }
            });

            // Show Next button (bottom right) after the thrust
            if (!this.nextBtn) {
                const nextBtnX = 1480;
                const nextBtnY = 860;
                this.nextBtn = this.add.rectangle(nextBtnX, nextBtnY, 180, 54, 0x388e3c, 0.95)
                    .setOrigin(0.5)
                    .setDepth(500)
                    .setInteractive({ useHandCursor: true });
                this.nextBtnText = this.add.text(nextBtnX, nextBtnY, 'Next', {
                    fontSize: '28px',
                    color: '#fff',
                    fontFamily: 'Arial'
                }).setOrigin(0.5).setDepth(501);
                this.nextBtn.on('pointerdown', () => {
                    this.scene.start('Scene48');
                });
            }
        });

        // Cleanup on shutdown
        this.events.once('shutdown', () => {
            if (gameCanvas) {
                gameCanvas.style.cursor = '';
                gameCanvas.style.removeProperty('cursor');
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}