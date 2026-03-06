import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene2 extends Scene
{
    background!: GameObjects.Image;
    hiddenHitbox!: GameObjects.Rectangle;
    hiddenHitbox2!: GameObjects.Rectangle;
    reqForm!: GameObjects.Image;
    blurOverlay!: GameObjects.Rectangle;

    constructor ()
    {
        super('Scene2');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'scene_2');
        
        // Hidden hitbox 1 based on coordinates:
        // Top left: (822, 34.5), Top right: (1536, 36.5)
        // Bottom left: (821, 874.5), Bottom right: (1536, 871.5)
        const hitboxX = (822 + 1536) / 2; // center X = 1179
        const hitboxY = (34.5 + 874.5) / 2; // center Y = 454.5
        const hitboxWidth = 1536 - 822; // width = 714
        const hitboxHeight = 874.5 - 34.5; // height = 840
        
        this.hiddenHitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        this.hiddenHitbox.setInteractive({ useHandCursor: true });
        this.hiddenHitbox.setAlpha(0.001); // Nearly invisible but still interactive
        this.hiddenHitbox.setDepth(10); // Above background
        
        this.hiddenHitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene2] Hidden hitbox 1 clicked at x: ${pointer.x}, y: ${pointer.y}`);
            this.showReqForm();
        });

        // Hidden hitbox 2 based on coordinates:
        // Top left: (73, 792.5), Bottom right: (748, 840.5)
        const hitbox2X = (73 + 748) / 2; // center X = 410.5
        const hitbox2Y = (792.5 + 840.5) / 2; // center Y = 816.5
        const hitbox2Width = 748 - 73; // width = 675
        const hitbox2Height = 840.5 - 792.5; // height = 48
        
        this.hiddenHitbox2 = this.add.rectangle(hitbox2X, hitbox2Y, hitbox2Width, hitbox2Height);
        this.hiddenHitbox2.setInteractive({ useHandCursor: true });
        this.hiddenHitbox2.setAlpha(0.001); // Nearly invisible but still interactive
        this.hiddenHitbox2.setDepth(10); // Above background
        
        this.hiddenHitbox2.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene2] Hidden hitbox 2 clicked at x: ${pointer.x}, y: ${pointer.y}`);
            this.scene.start('Scene3');
        });

        // Debug: log click coordinates on background (lower depth)
        this.background.setInteractive();
        this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene2] Background click at x: ${pointer.x}, y: ${pointer.y}`);
        });

        EventBus.emit('current-scene-ready', this);
    }

    showReqForm ()
    {
        if (!this.blurOverlay) {
            this.blurOverlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7);
            this.blurOverlay.setDepth(99);
            this.blurOverlay.setInteractive();
        } else {
            this.blurOverlay.setVisible(true);
        }

        if (!this.reqForm) {
            this.reqForm = this.add.image(800, 450, 'req_form');
            this.reqForm.setDisplaySize(800, 900);
            this.reqForm.setDepth(100);
            this.reqForm.setInteractive();
        } else {
            this.reqForm.setVisible(true);
            this.reqForm.setPosition(800, 450);
            this.reqForm.setDisplaySize(800, 900);
        }

        const baseScaleX = this.reqForm.scaleX;
        const baseScaleY = this.reqForm.scaleY;
        let zoomLevel = 1;
        const MIN_ZOOM = 1;
        const MAX_ZOOM = 4;
        let isDragging = false;
        let dragStartPX = 0, dragStartPY = 0;
        let imgStartX = 800, imgStartY = 450;
        let hasDragged = false;

        const clampPos = () => {
            const hw = this.reqForm.displayWidth / 2;
            const hh = this.reqForm.displayHeight / 2;
            if (this.reqForm.displayWidth <= 1600) { this.reqForm.x = 800; }
            else { this.reqForm.x = Phaser.Math.Clamp(this.reqForm.x, 1600 - hw, hw); }
            if (this.reqForm.displayHeight <= 900) { this.reqForm.y = 450; }
            else { this.reqForm.y = Phaser.Math.Clamp(this.reqForm.y, 900 - hh, hh); }
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
            this.reqForm.setVisible(false);
            this.blurOverlay.setVisible(false);
            hintGfx.destroy();
            hintText.destroy();
            this.input.off('wheel', onWheel);
            this.input.off('pointerdown', onPointerDown);
            this.input.off('pointermove', onPointerMove);
            this.input.off('pointerup', onPointerUp);
        };

        const onWheel = (_p: Phaser.Input.Pointer, _go: Phaser.GameObjects.GameObject[], _dx: number, dy: number) => {
            if (!this.reqForm.visible) return;
            zoomLevel = Phaser.Math.Clamp(zoomLevel + (dy > 0 ? -0.15 : 0.15), MIN_ZOOM, MAX_ZOOM);
            if (zoomLevel === MIN_ZOOM) { this.reqForm.setPosition(800, 450); }
            this.reqForm.setScale(baseScaleX * zoomLevel, baseScaleY * zoomLevel);
            clampPos();
        };

        const onPointerDown = (pointer: Phaser.Input.Pointer) => {
            isDragging = true;
            hasDragged = false;
            dragStartPX = pointer.x;
            dragStartPY = pointer.y;
            imgStartX = this.reqForm.x;
            imgStartY = this.reqForm.y;
        };

        const onPointerMove = (pointer: Phaser.Input.Pointer) => {
            if (!isDragging || !this.reqForm.visible) return;
            const dx = pointer.x - dragStartPX;
            const dy = pointer.y - dragStartPY;
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged = true;
            if (zoomLevel > 1) {
                this.reqForm.setPosition(imgStartX + dx, imgStartY + dy);
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
