import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_11 extends Scene {
    constructor() {
        super('scene38_a_11');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_9') ? 'scene_38_a_9' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // Create a modal-like VirTips overlay as a container so it can be hidden easily
        const overlayWidth = 1200;
        const overlayHeight = 700;
        const overlayX = 800; // center of game (1600 width)
        const overlayY = 450; // center of game (900 height)

        const container = this.add.container(overlayX, overlayY);
        container.setDepth(10);

        // White background panel with border
        const bgGraphics = this.add.graphics();
        bgGraphics.fillStyle(0xffffff, 1);
        bgGraphics.fillRect(-overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight);
        bgGraphics.lineStyle(3, 0x000000, 1);
        bgGraphics.strokeRect(-overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight);
        container.add(bgGraphics);

        // Title (top-left area)
        const title = this.add.text(-overlayWidth / 2 + 80, -overlayHeight / 2 + 40, 'VirTips', {
            fontFamily: 'Arial',
            fontSize: '40px',
            color: '#0b63b8',
            fontStyle: 'bold'
        });
        container.add(title);

        // Close button (top-right)
        const close = this.add.text(overlayWidth / 2 - 60, -overlayHeight / 2 + 28, '✕', {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#000000'
        }).setInteractive({ useHandCursor: true });
        close.on('pointerdown', () => container.setVisible(false));
        container.add(close);

        // Draw inset white text box with purple border for main paragraph
        const graphics = this.add.graphics();
        const boxX = -overlayWidth / 2 + 40;
        const boxY = -overlayHeight / 2 + 100;
        const boxW = 520;
        const boxH = 180;
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(boxX, boxY, boxW, boxH);
        graphics.lineStyle(3, 0x8a2be2, 1);
        graphics.strokeRect(boxX, boxY, boxW, boxH);
        container.add(graphics);

        // Main explanatory text
        const mainText = this.add.text(boxX + 10, boxY + 10, 'Tissue bridging refers to the presence of intact strands of tissue, such as blood vessels, nerves, or connective tissue, spanning across the depth of a wound. These bridges form because different soft tissues have varying strengths and do not all tear completely when force is applied.', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: boxW - 20 }
        });
        container.add(mainText);

        // Right-side wound image placeholder with extra gap
        const imageGap = 60; // extra gap between text box and image
        const imgX = -overlayWidth / 2 + 40 + boxW + 80 + imageGap; // shifted further right
        const imgY = -overlayHeight / 2 + 90;

        // Image placeholder background
        const imgPlaceholder = this.add.graphics();
        imgPlaceholder.fillStyle(0xf0f0f0, 1);
        imgPlaceholder.fillRect(imgX - 130, imgY + 10, 260, 180);
        imgPlaceholder.lineStyle(2, 0xcccccc, 1);
        imgPlaceholder.strokeRect(imgX - 130, imgY + 10, 260, 180);
        container.add(imgPlaceholder);


        // Placeholder text
        const placeholderText = this.add.text(imgX, imgY + 90, '[Wound Image\nPlaceholder]', {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#888888',
            align: 'center'
        });
        placeholderText.setOrigin(0.5, 0.5);
        container.add(placeholderText);

        // Show tissue_bridging.png on the image placeholder
        const tbImage = this.add.image(imgX, imgY + 100, 'tissue_bridging');
        tbImage.setDisplaySize(180, 120);
        tbImage.setOrigin(0.5, 0.5);
        container.add(tbImage);

        // Citation under image
        const citation = this.add.text(imgX - 20, imgY + 215, 'https://emedicine.medscape.com/article/1680082-overview#a2', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: '#000000',
            fontStyle: 'italic'
        });
        container.add(citation);

        // Key points list below the main box
        const keyPointsY = boxY + boxH + 40;
        const keyPoints = this.add.text(boxX + 6, keyPointsY, 'Key points:\n• The presence of tissue bridging is decisive evidence that the wound was produced by blunt force rather than a sharp cutting instrument.\n• It is a key feature used to distinguish torn wounds from cleanly incised wounds during examination.', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: 900 }
        });
        container.add(keyPoints);

        // Footer citation line at bottom-left of modal
        const footer = this.add.text(-overlayWidth / 2 + 30, overlayHeight / 2 - 30, 'Forensic Pathology Second Edition by Vincent J. DiMaio and Dominick DiMaio', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: '#000000'
        });
        container.add(footer);

        // Keep global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_11 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
