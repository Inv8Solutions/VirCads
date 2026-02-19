import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_9 extends Scene {
    constructor() {
        super('scene38_a_9');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_9') ? 'scene_38_a_9' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Next button (bottom-right)
        const nextBtnW = 160;
        const nextBtnH = 48;
        const nextBtnX = 1520;
        const nextBtnY = 860;

        const nextBg = this.add.rectangle(nextBtnX, nextBtnY, nextBtnW, nextBtnH, 0x000000, 0.9).setDepth(250);
        nextBg.setStrokeStyle(2, 0xffffff, 0.08);
        const nextText = this.add.text(nextBtnX, nextBtnY, 'Next', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5).setDepth(251);
        nextBg.setInteractive({ useHandCursor: true });
        nextBg.on('pointerdown', () => {
            console.log('[INPUT] scene38_a_9 Next clicked — starting scene38_a_10');
            this.scene.start('scene38_a_10');
        });

        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_9 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
