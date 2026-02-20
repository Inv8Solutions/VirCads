import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_9 extends Scene {
    constructor() {
        super('scene38_b_9');
    }

    create() {
        // Use the scene_38_b_8 image as the background for this scene
        const bg = this.add.image(800, 450, 'scene_38_b_8');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Flash effect on start
        if (this.cameras && this.cameras.main) {
            this.cameras.main.flash(400, 255, 255, 255);
        }

        // Bottom-center dialog shown during flash
        const bottomDlgWidth = 800;
        const bottomDlgX = 800;
        const bottomDlgY = 840;
        const bottomDlgPadding = 12;
        const bottomDlgTextStr = 'Autopsy technician documentation in progress.';
        const bottomDlgStyle = { fontSize: '16px', color: '#ffffff', align: 'center', wordWrap: { width: bottomDlgWidth - 24 } };

        const bottomText = this.add.text(bottomDlgX, 0, bottomDlgTextStr, bottomDlgStyle).setOrigin(0.5, 0).setDepth(110);
        const bottomBounds = bottomText.getBounds();
        const bottomDlgHeight = bottomDlgPadding * 2 + bottomBounds.height;

        const bottomBg = this.add.rectangle(bottomDlgX, bottomDlgY, bottomDlgWidth, bottomDlgHeight, 0x000000, 0.92)
            .setDepth(109);
        bottomBg.setStrokeStyle(2, 0xffffff, 0.08);

        const bottomTop = bottomDlgY - bottomDlgHeight / 2 + bottomDlgPadding;
        bottomText.setPosition(bottomDlgX, bottomTop);

        // Next button (hidden until after flash)
        const nbW = 140;
        const nbH = 36;
        const nbX = bottomDlgX + bottomDlgWidth / 2 - nbW / 2 - 12; // right end inside the dialog area
        const nbY = bottomDlgY;
        const nbBg = this.add.rectangle(nbX, nbY, nbW, nbH, 0xffffff)
            .setOrigin(0.5, 0.5)
            .setDepth(111)
            .setStrokeStyle(2, 0x000000)
            .setVisible(false);
        const nbText = this.add.text(nbX, nbY, 'Next', { fontSize: '16px', color: '#000000' })
            .setOrigin(0.5, 0.5)
            .setDepth(112)
            .setVisible(false);

        // Reveal dialog until flash completes, then hide dialog and show Next button
        if (this.cameras && this.cameras.main) {
            // After flash completes, keep the documentation dialog visible and show the Next button
            this.cameras.main.once('cameraflashcomplete', () => {
                nbBg.setVisible(true);
                nbText.setVisible(true);
                nbBg.setInteractive({ useHandCursor: true });
                nbBg.once('pointerdown', (pointer: Phaser.Input.Pointer) => {
                    console.log(`[Scene38_b_9] Next clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                    if (this.scene.get('scene38_b_10')) {
                        this.scene.start('scene38_b_10');
                    } else {
                        console.warn('scene38_b_10 not registered');
                    }
                });
            });
        } else {
            // Fallback: reveal Next button after 500ms but retain the documentation dialog
            this.time.delayedCall(500, () => {
                nbBg.setVisible(true);
                nbText.setVisible(true);
                nbBg.setInteractive({ useHandCursor: true });
            });
        }

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_9 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
