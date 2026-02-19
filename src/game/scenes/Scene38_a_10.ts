import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_10 extends Scene {
    constructor() {
        super('scene38_a_10');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_9') ? 'scene_38_a_9' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Flash, then show lab technician image, then display dialog
        this.cameras.main.flash(300, 255, 255, 255);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FLASH_COMPLETE, () => {
            const lab = this.add.image(1200, 180, 'lab_tech').setDepth(150).setAlpha(0);
            lab.setDisplaySize(220, 220);
            this.tweens.add({
                targets: lab,
                alpha: 1,
                duration: 400,
                onComplete: () => {
                    const dW = 760;
                    const dH = 80;
                    const dX = 800;
                    const dY = 220;
                    const dialogBg = this.add.rectangle(dX, dY, dW, dH, 0x000000, 0.92).setDepth(200);
                    dialogBg.setStrokeStyle(2, 0xffffff, 0.08);
                    this.add.text(dX, dY, 'Doctor, there is evidence of tissue bridging, which is indicative of a laceration.', {
                        fontSize: '18px',
                        color: '#ffffff',
                        align: 'center',
                        wordWrap: { width: dW - 24 }
                    }).setOrigin(0.5, 0.5).setDepth(201);
                }
            });
        });

       
        // Next button (bottom-right)
        const nextBtnW = 160;
        const nextBtnH = 48;
        const nextBtnX = 1520;
        const nextBtnY = 860;

        const nextBg = this.add.rectangle(nextBtnX, nextBtnY, nextBtnW, nextBtnH, 0x000000, 0.9).setDepth(250);
        nextBg.setStrokeStyle(2, 0xffffff, 0.08);
        this.add.text(nextBtnX, nextBtnY, 'Next', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(251);
        nextBg.setInteractive({ useHandCursor: true });
        nextBg.on('pointerdown', () => {
            console.log('[INPUT] scene38_a_10 Next clicked — starting scene38_a_11');
            this.scene.start('scene38_a_11');
        });

        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_10 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
