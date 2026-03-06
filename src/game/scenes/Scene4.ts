import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene4 extends Scene
{
    background!: GameObjects.Image;
    hiddenHitbox!: GameObjects.Rectangle;
    hiddenHitbox2!: GameObjects.Rectangle;
    consentCert!: GameObjects.Image;
    blurOverlay!: GameObjects.Rectangle;

    constructor ()
    {
        super('Scene4');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'scene_4');
        
        // Hidden hitbox 1 (big) - same coordinates as other scenes
        const hitboxX = (822 + 1536) / 2; // center X = 1179
        const hitboxY = (34.5 + 874.5) / 2; // center Y = 454.5
        const hitboxWidth = 1536 - 822; // width = 714
        const hitboxHeight = 874.5 - 34.5; // height = 840

        this.hiddenHitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        this.hiddenHitbox.setInteractive({ useHandCursor: true });
        this.hiddenHitbox.setAlpha(0.001);
        this.hiddenHitbox.setDepth(10);
        this.hiddenHitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene4] Hidden hitbox 1 clicked at x: ${pointer.x}, y: ${pointer.y}`);
            this.showConsentCert();
        });

        // Hidden hitbox 2 (small) - bottom-left area
        const hitbox2X = (73 + 748) / 2; // center X = 410.5
        const hitbox2Y = (792.5 + 840.5) / 2; // center Y = 816.5
        const hitbox2Width = 748 - 73; // width = 675
        const hitbox2Height = 840.5 - 792.5; // height = 48

        this.hiddenHitbox2 = this.add.rectangle(hitbox2X, hitbox2Y, hitbox2Width, hitbox2Height);
        this.hiddenHitbox2.setInteractive({ useHandCursor: true });
        this.hiddenHitbox2.setAlpha(0.001);
        this.hiddenHitbox2.setDepth(10);
        this.hiddenHitbox2.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene4] Hidden hitbox 2 clicked at x: ${pointer.x}, y: ${pointer.y}`);
            this.scene.start('Scene5');
        });

        // Background debug (lower depth)
        this.background.setInteractive();
        this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene4] Background click at x: ${pointer.x}, y: ${pointer.y}`);
        });

        EventBus.emit('current-scene-ready', this);
    }

    showConsentCert ()
    {
        if (!this.blurOverlay) {
            this.blurOverlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7);
            this.blurOverlay.setDepth(99);
            this.blurOverlay.setInteractive();
        } else {
            this.blurOverlay.setVisible(true);
        }

        if (!this.consentCert) {
            this.consentCert = this.add.image(800, 450, 'consent_cert');
            this.consentCert.setDisplaySize(800, 900);
            this.consentCert.setDepth(100);
            this.consentCert.setInteractive();
        } else {
            this.consentCert.setVisible(true);
            this.consentCert.setPosition(800, 450);
            this.consentCert.setDisplaySize(800, 900);
        }

        const baseScaleX = this.consentCert.scaleX;
        const baseScaleY = this.consentCert.scaleY;
        let zoomLevel = 1;
        const MIN_ZOOM = 1;
        const MAX_ZOOM = 4;
        let isDragging = false;
        let dragStartPX = 0, dragStartPY = 0;
        let imgStartX = 800, imgStartY = 450;
        let hasDragged = false;

        const clampPos = () => {
            const hw = this.consentCert.displayWidth / 2;
            const hh = this.consentCert.displayHeight / 2;
            if (this.consentCert.displayWidth <= 1600) { this.consentCert.x = 800; }
            else { this.consentCert.x = Phaser.Math.Clamp(this.consentCert.x, 1600 - hw, hw); }
            if (this.consentCert.displayHeight <= 900) { this.consentCert.y = 450; }
            else { this.consentCert.y = Phaser.Math.Clamp(this.consentCert.y, 900 - hh, hh); }
        };

        // Hint dialog — top center
        const hintW = 520;
        const hintH = 48;
        const hintX = 800 - hintW / 2;
        const hintY = 16;
        const hintGfx = this.add.graphics().setDepth(110);
        hintGfx.fillStyle(0x1a3a8f, 1);
        hintGfx.fillRoundedRect(hintX - 4, hintY - 4, hintW + 8, hintH + 8, 10);
        hintGfx.fillStyle(0x2255cc, 1);
        hintGfx.fillRoundedRect(hintX, hintY, hintW, hintH, 8);
        const hintText = this.add.text(800, hintY + hintH / 2, '🖱 Scroll to zoom  •  Drag to pan  •  Click to close', {
            fontSize: '17px', color: '#ffffff', fontStyle: 'italic', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(111);

        const cleanup = () => {
            this.consentCert.setVisible(false);
            this.blurOverlay.setVisible(false);
            hintGfx.destroy();
            hintText.destroy();
            this.input.off('wheel', onWheel);
            this.input.off('pointerdown', onPointerDown);
            this.input.off('pointermove', onPointerMove);
            this.input.off('pointerup', onPointerUp);
        };

        const onWheel = (_p: Phaser.Input.Pointer, _go: Phaser.GameObjects.GameObject[], _dx: number, dy: number) => {
            if (!this.consentCert.visible) return;
            zoomLevel = Phaser.Math.Clamp(zoomLevel + (dy > 0 ? -0.15 : 0.15), MIN_ZOOM, MAX_ZOOM);
            if (zoomLevel === MIN_ZOOM) { this.consentCert.setPosition(800, 450); }
            this.consentCert.setScale(baseScaleX * zoomLevel, baseScaleY * zoomLevel);
            clampPos();
        };

        const onPointerDown = (pointer: Phaser.Input.Pointer) => {
            isDragging = true;
            hasDragged = false;
            dragStartPX = pointer.x;
            dragStartPY = pointer.y;
            imgStartX = this.consentCert.x;
            imgStartY = this.consentCert.y;
        };

        const onPointerMove = (pointer: Phaser.Input.Pointer) => {
            if (!isDragging || !this.consentCert.visible) return;
            const dx = pointer.x - dragStartPX;
            const dy = pointer.y - dragStartPY;
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged = true;
            if (zoomLevel > 1) {
                this.consentCert.setPosition(imgStartX + dx, imgStartY + dy);
                clampPos();
            }
        };

        const onPointerUp = () => {
            if (isDragging && !hasDragged) { cleanup(); return; }
            isDragging = false;
        };

        this.input.on('wheel', onWheel);
        this.input.on('pointerdown', onPointerDown);
        this.input.on('pointermove', onPointerMove);
        this.input.on('pointerup', onPointerUp);
    }
}
