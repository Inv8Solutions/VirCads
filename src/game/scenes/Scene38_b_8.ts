import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_8 extends Scene {
    constructor() {
        super('scene38_b_8');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38_b_8');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Lab technician image lower-left
        const techX = 140;
        const techY = 720;
        const tech = this.add.image(techX, techY, 'lab_tech').setDepth(60);
        tech.setDisplaySize(220, 220);

        // Dialog placed at the right end of the lab tech image (larger background)
        const dlgWidth = 700;
        const dlgHeightEstimate = 140;
        const techW = 220; // matches setDisplaySize above
        const techH = 220;
        const margin = 12;
        const dlgX = techX + techW / 2 + dlgWidth / 2 + margin; // right end of tech
        const dlgY = techY - techH / 8; // slightly above tech center
        const dlgPadding = 12;
        const dlgTextStr = 'Doctor, let me photograph the injury';
        const dlgStyle = { fontSize: '16px', color: '#ffffff', align: 'left', wordWrap: { width: dlgWidth - 24 } };

        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(63);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;

        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0x000000, 0.96)
            .setDepth(62);
        dlgBg.setStrokeStyle(2, 0xffffff, 0.08);

        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Next button (bottom-right)
        const nextW = 120;
        const nextH = 36;
        const nextX = 1500;
        const nextY = 840;
        const nextBg = this.add.rectangle(nextX, nextY, nextW, nextH, 0x0066cc)
            .setOrigin(0.5, 0.5)
            .setDepth(70)
            .setInteractive({ useHandCursor: true });
        const nextText = this.add.text(nextX, nextY, 'Next', { fontSize: '16px', color: '#ffffff' })
            .setOrigin(0.5, 0.5)
            .setDepth(71);
        nextBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_8 next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('scene38_b_9');
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_8 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
