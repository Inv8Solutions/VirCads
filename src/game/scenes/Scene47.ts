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

        // Load cursor as data URL
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 96;
            canvas.height = 96;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, 96, 96);
                const dataUrl = canvas.toDataURL();
                setCursor(`url(${dataUrl}) 48 48, crosshair`);
            }
        };
        img.src = probingStickCursorUrl;

        // Hitbox (invisible) — same coordinates as Scene46 stab hitbox
        const stabX1 = 882, stabY1 = 463.5, stabX2 = 922, stabY2 = 579.5;
        const hitboxX = (stabX1 + stabX2) / 2 + 50;  // shifted right 50px (was 902)
        const hitboxY = (stabY1 + stabY2) / 2;  // 521.5
        const hitboxW = Math.abs(stabX2 - stabX1); // 40
        const hitboxH = Math.abs(stabY2 - stabY1); // 116
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
            this.probe!.setAngle(-35);
        });

        // While moving over hitbox: keep probe sprite at pointer
        hitbox.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!this.isThrustAnimating) {
                this.probe!.setPosition(pointer.worldX, pointer.worldY);
                this.probe!.setAngle(-35);
            }
        });

        // When leaving hitbox: restore CSS cursor, hide probe sprite
        hitbox.on('pointerout', () => {
            img.onload && setCursor(`url(${img.src}) 48 48, crosshair`);
            // Restore the data-url cursor if it was loaded
            const canvas = document.createElement('canvas');
            canvas.width = 96;
            canvas.height = 96;
            const ctx = canvas.getContext('2d');
            if (ctx && img.complete) {
                ctx.drawImage(img, 0, 0, 96, 96);
                setCursor(`url(${canvas.toDataURL()}) 48 48, crosshair`);
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
            this.probe!.setAngle(-35);
            this.probe!.setVisible(true);

            this.tweens.add({
                targets: this.probe,
                x: tx,
                y: ty,
                angle: -50,
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