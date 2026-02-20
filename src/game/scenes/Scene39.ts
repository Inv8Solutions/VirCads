import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene39 extends Scene {
    constructor() {
        super('scene39');
    }

    create() {
        const bgKey = this.textures.exists('scene_39') ? 'scene_39' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        const title = this.add.text(800, 120, 'Scene 39', { fontFamily: 'Arial', fontSize: '48px', color: '#ffffff' }).setOrigin(0.5).setDepth(1);
        // overlay box (Important Note)
        const overlayWidth = 1200;
        const overlayHeight = 260;
        const overlayX = 800 - overlayWidth / 2;
        const overlayY = 220;

        const graphics = this.add.graphics({ x: 0, y: 0 }).setDepth(2);
        graphics.fillStyle(0xffffff, 1);
        graphics.lineStyle(4, 0x000000, 1);
        const radius = 20;
        graphics.fillRoundedRect(overlayX, overlayY, overlayWidth, overlayHeight, radius);
        graphics.strokeRoundedRect(overlayX, overlayY, overlayWidth, overlayHeight, radius);

        const noteTitle = this.add.text(overlayX + 28, overlayY + 16, 'Important Note', { fontFamily: 'Georgia, serif', fontSize: '28px', color: '#000000', fontStyle: 'bold' }).setDepth(3);

        const bodyText = `In an actual post-mortem examination, all injuries must be thoroughly examined, measured, and photographed. In this virtual morgue, the autopsy technician will measure and document the remaining contusions on your behalf to save time and allow you to proceed with the examination of other injury types.`;

        const body = this.add.text(overlayX + 28, overlayY + 60, bodyText, { fontFamily: 'Georgia, serif', fontSize: '20px', color: '#111111', wordWrap: { width: overlayWidth - 56 } }).setDepth(3);

        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene39 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        // Add a bottom-right "Next" button that starts the next registered scene (if any)
        const padding = 20;
        const btnWidth = 160;
        const btnHeight = 56;
        const btnRight = 1600 - padding;
        const btnBottom = 900 - padding;
        const btnCenterX = btnRight - btnWidth / 2;
        const btnCenterY = btnBottom - btnHeight / 2;

        const btnRect = this.add.rectangle(btnCenterX, btnCenterY, btnWidth, btnHeight, 0xffffff, 1).setDepth(4).setStrokeStyle(2, 0x000000);
        const btnText = this.add.text(btnCenterX, btnCenterY, 'Next', { fontFamily: 'Arial', fontSize: '28px', color: '#000000' }).setOrigin(0.5).setDepth(5);

        btnRect.setInteractive({ useHandCursor: true });
        btnRect.on('pointerover', () => btnRect.setFillStyle(0xeeeeee, 1));
        btnRect.on('pointerout', () => btnRect.setFillStyle(0xffffff, 1));

        btnRect.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene39 NEXT click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });

            // Determine the next registered scene dynamically
            try {
                const scenes = this.game.scene.scenes.map((s: Phaser.Scene) => s.scene.key);
                const idx = scenes.indexOf(this.scene.key);
                const nextKey = (idx >= 0 && idx < scenes.length - 1) ? scenes[idx + 1] : null;
                if (nextKey) {
                    this.scene.start(nextKey);
                } else {
                    console.warn('[Scene39] No next scene registered to navigate to');
                }
            } catch (e) {
                console.warn('[Scene39] failed to navigate to next scene', e);
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
