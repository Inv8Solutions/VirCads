import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50_a_2 extends Scene {
    constructor() {
        super('Scene50_a_2');
    }

    create() {
        if (this.textures.exists('scene_50_a_1')) {
            const bg = this.add.image(800, 450, 'scene_50_a_1');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // left-side clipboard image for this scene
        if (this.textures.exists('abrasion_clipboard')) {
            // place clipboard at original size on the left side
            this.add.image(80, 450, 'abrasion_clipboard').setOrigin(0, 0.5).setDepth(20);
        }

        // Bottom-right Next button to advance to Scene50_a_3
        const btnW = 180;
        const btnH = 56;
        const btnX = 1500;
        const btnY = 820;

        const x0 = btnX - btnW / 2;
        const y0 = btnY - btnH / 2;

        const nextBtn = this.add.graphics().setDepth(60);
        nextBtn.fillStyle(0x1a3a8f, 1);
        nextBtn.fillRoundedRect(x0, y0, btnW, btnH, 10);
        nextBtn.lineStyle(2, 0xffffff, 0.5);
        nextBtn.strokeRoundedRect(x0, y0, btnW, btnH, 10);

        const nextText = this.add.text(btnX, btnY, 'Next', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5).setDepth(61);

        const nextZone = this.add.zone(btnX, btnY, btnW, btnH).setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(62);
        nextZone.on('pointerover', () => {
            nextBtn.clear();
            nextBtn.fillStyle(0x122266, 1);
            nextBtn.fillRoundedRect(x0, y0, btnW, btnH, 10);
            nextBtn.lineStyle(2, 0xffffff, 0.5);
            nextBtn.strokeRoundedRect(x0, y0, btnW, btnH, 10);
        });
        nextZone.on('pointerout', () => {
            nextBtn.clear();
            nextBtn.fillStyle(0x1a3a8f, 1);
            nextBtn.fillRoundedRect(x0, y0, btnW, btnH, 10);
            nextBtn.lineStyle(2, 0xffffff, 0.5);
            nextBtn.strokeRoundedRect(x0, y0, btnW, btnH, 10);
        });
        nextZone.on('pointerup', () => {
            this.scene.start('Scene50_a_3');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
