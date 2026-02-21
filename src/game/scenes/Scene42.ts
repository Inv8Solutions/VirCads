import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene42 extends Scene {
    constructor() {
        super('scene42');
    }

    create() {

        // Background as before
        const bgKey = this.textures.exists('scene_40') ? 'scene_40' : (this.textures.exists('scene_39') ? 'scene_39' : 'scene_38');
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);


        // Overlay panel background (wider and taller for two-column layout)
        const overlayWidth = 1100;

            // Overlay panel background centered on screen
            const overlayHeight = 560;
            const overlayX = 800;
            const overlayY = 450; // center of screen
            const overlay = this.add.rectangle(overlayX, overlayY, overlayWidth, overlayHeight, 0xffffff, 0.97)
                .setStrokeStyle(4, 0x0077c8)
                .setDepth(10);

            // Compute overlay bounds
            const overlayLeft = overlayX - overlayWidth / 2;
            const overlayRight = overlayLeft + overlayWidth;
            const overlayTop = overlayY - overlayHeight / 2;
            const overlayBottom = overlayY + overlayHeight / 2;

            // Next button (bottom right of overlay)
            const nextBtnX = overlayRight - 100;
            const nextBtnY = overlayBottom - 50;
            const nextBtn = this.add.rectangle(nextBtnX, nextBtnY, 140, 48, 0x2196f3, 1)
                .setDepth(13)
                .setInteractive({ useHandCursor: true });
            this.add.text(nextBtnX, nextBtnY, 'Next →', {
                fontFamily: 'Arial Black', fontSize: '24px', color: '#fff', align: 'center'
            }).setOrigin(0.5).setDepth(14);

            nextBtn.on('pointerdown', () => {
                this.scene.start('Scene43');
            });

            // Blue header bar placed at topmost part of overlay
            const headerHeight = 56;
            this.add.rectangle(overlayX, overlayTop + headerHeight / 2 + 6, overlayWidth, headerHeight, 0x2196f3, 1)
                .setDepth(11);

            // VirTips header text at topmost part of overlay (inside header)
            this.add.text(overlayLeft + 18, overlayTop + 8, 'VirTips', {
                fontFamily: 'Arial Black',
                fontSize: '36px',
                color: '#000',
                fontStyle: 'bold',
                stroke: '#000',
                strokeThickness: 2
            }).setDepth(12);

            // Stab wound image (right column, inside overlay)
            const imageWidth = 320;
            const imageHeight = 240;
            const imageX = overlayRight - imageWidth / 2 - 10; // right side with smaller margin (moved further right)
            const imageY = overlayY - 20; // slightly above center
            this.add.image(imageX, imageY, 'stab_wound')
                .setDisplaySize(imageWidth, imageHeight)
                .setDepth(12)
                .setOrigin(0.5);

        // Main overlay text (left column, top-aligned)
        const textLeft = overlayLeft + 36;
        const textY = overlayTop + headerHeight + 18;

        // Use a single wrapped heading text to avoid overlap and measure height
        const heading = "A stab wound is caused by a sharp or pointed implement and is typically deeper than it is long on the skin surface.";
        const imageLeft = imageX - imageWidth / 2;
        const headingWrapWidth = Math.max(100, imageLeft - 20 - textLeft); // wrap at image left edge minus margin
        const headingText = this.add.text(textLeft, textY, heading, {
            fontFamily: 'Arial',
            fontSize: '26px',
            color: '#000',
            wordWrap: { width: headingWrapWidth }
        }).setDepth(12);

        // After heading height, position bullet points with increased spacing
        const bulletPoints = [
            'Depth and direction of the wound are crucial in reconstructing events and evaluating accounts of causation',
            'The weapon need only have a point or tip; the cutting edge does not need to be sharp',
            'Stab-like wounds may also be produced by relatively blunt pointed objects (e.g., screwdrivers, car keys)',
            'The skin wound appearance can help estimate the size and cross-sectional shape of the weapon',
            '⚠️ Accurate documentation at examination is essential for legal interpretation.'
        ];

        const headingHeight = headingText.height || 64;
        let bulletY = textY + headingHeight + 30;
        const bulletLineHeight = 46; // increased spacing

        bulletPoints.forEach((text, i) => {
            this.add.text(textLeft, bulletY + i * bulletLineHeight, (text.startsWith('⚠️') ? '' : '\u2022 ') + text, {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#222',
                wordWrap: { width: headingWrapWidth },
                lineSpacing: 6
            }).setDepth(12);
        });

        // Reference text (right column, bottom-aligned but left of image)
        const referenceY = bulletY + bulletPoints.length * bulletLineHeight + 16;
        this.add.text(textLeft, referenceY, "Simpson's Forensic Medicine 13th edition by Payne-James, Jones, Karch, & Manlove: Chapter 8; Assessment, Classification, Documentation of Injury (Page 87)", {
            fontFamily: 'Arial', fontSize: '13px', color: '#222', wordWrap: { width: headingWrapWidth }
        }).setDepth(12);

        // Optionally: add close/hide logic here if needed

                // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene42 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
