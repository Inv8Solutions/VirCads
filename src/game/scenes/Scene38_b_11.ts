import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_11 extends Scene {
    constructor() {
        super('scene38_b_11');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_b_11') ? 'scene_38_b_11' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // Instruction dialog + Next button
        const dlgW = 700;
        const dlgH = 120;
        const dlgX = 800;
        const dlgY = 140;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgW, dlgH, 0x000000, 0.9).setDepth(50);
        dlgBg.setStrokeStyle(2, 0xffffff, 0.08);
        const dlgText = this.add.text(dlgX - dlgW / 2 + 16, dlgY - dlgH / 2 + 12, 'Measure the distance of the injury from the midline.', { fontSize: '18px', color: '#ffffff', wordWrap: { width: dlgW - 160 } }).setDepth(51);

        const nextW = 120;
        const nextH = 40;
        const nextX = dlgX + dlgW / 2 - nextW / 2 - 16;
        const nextY = dlgY + dlgH / 2 - nextH / 2 - 12;
        const nextBg = this.add.rectangle(nextX, nextY, nextW, nextH, 0x0066cc).setOrigin(0.5).setDepth(52);
        const nextLabel = this.add.text(nextX, nextY, 'Next', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5).setDepth(53);
        nextBg.setInteractive({ useHandCursor: true });
        nextBg.on('pointerdown', () => {
            this.scene.start('scene38_b_12');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
