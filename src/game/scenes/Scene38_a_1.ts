import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_1 extends Scene {
    constructor() {
        super('scene38_a_1');
    }

    create() {
        const bg = this.add.rectangle(800, 450, 1600, 900, 0x111111, 1);
        bg.setDepth(0);

        // Blue bordered square at specified coordinates
        const x1 = 898;
        const y1 = 596.5;
        const x2 = 950;
        const y2 = 646.5;
        const rectX = Math.min(x1, x2);
        const rectY = Math.min(y1, y2);
        const rectW = Math.abs(x2 - x1);
        const rectH = Math.abs(y2 - y1);

        // Draw stroked rectangle with Graphics and ensure it's above the background
        const debugGraphics = this.add.graphics();
        debugGraphics.clear();
        debugGraphics.lineStyle(4, 0x0000ff, 1);
        debugGraphics.strokeRect(rectX, rectY, rectW, rectH);
        debugGraphics.setDepth(1000);
        this.children.bringToTop(debugGraphics);

        this.add.text(800, 450, 'scene38_a_1 placeholder', {
            fontSize: '28px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setDepth(10);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_1 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
