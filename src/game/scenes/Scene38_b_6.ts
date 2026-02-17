import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_6 extends Scene {
    constructor() {
        super('scene38_b_6');
    }

    create() {
        // Use the scene-specific background image
        const bg = this.add.image(800, 450, 'scene_38_b_6');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Bottom-center dialog prompting user to select the ruler
        const dlgWidth = 760;
        const dlgX = 800;
        const dlgY = 840;
        const dlgPadding = 12;
        const dlgTextStr = 'Select the ruler from the table';
        const dlgStyle = { fontSize: '20px', color: '#ffffff', align: 'center', wordWrap: { width: dlgWidth - 24 } };

        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(60);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;

        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0x000000, 0.92)
            .setDepth(59);
        dlgBg.setStrokeStyle(2, 0xffffff, 0.08);

        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Invisible hitbox: clicks here go to scene38_b_7
        const hx1 = 1010.5;
        const hy1 = 337;
        const hx2 = 1156.5;
        const hy2 = 447;
        const hxX = Math.min(hx1, hx2);
        const hxY = Math.min(hy1, hy2);
        const hxW = Math.abs(hx2 - hx1);
        const hxH = Math.abs(hy2 - hy1);

        const hitbox = this.add.rectangle(hxX + hxW / 2, hxY + hxH / 2, hxW, hxH, 0x000000, 0)
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(40);

        hitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_6 hitbox click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('scene38_b_7');
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_b_6 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
