import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38 extends Scene {
    constructor() {
        super('Scene38');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_38');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // top-center dialog
        const topDialogWidth = 760;
        const topDialogHeight = 64;
        const topDialogX = 800;
        const topDialogY = 56;

        const topDialogGfx = this.add.graphics().setDepth(10);
        // Outer dark navy border
        topDialogGfx.fillStyle(0x1a3a8f, 1);
        topDialogGfx.fillRoundedRect(topDialogX - topDialogWidth / 2 - 6, topDialogY - topDialogHeight / 2 - 6, topDialogWidth + 12, topDialogHeight + 12, 10);
        // Inner blue fill
        topDialogGfx.fillStyle(0x2255cc, 1);
        topDialogGfx.fillRoundedRect(topDialogX - topDialogWidth / 2, topDialogY - topDialogHeight / 2, topDialogWidth, topDialogHeight, 8);

        this.add.text(topDialogX, topDialogY, 'click on the injury you want to inspect', {
            fontSize: '18px',
            color: '#ffffff',
            fontStyle: 'italic',
            align: 'center',
            wordWrap: { width: topDialogWidth - 24 }
        }).setOrigin(0.5, 0.5).setDepth(11);

        // click debug logging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        // Add invisible interactive hitboxes for injuries
        // contusion between (894,582.5) and (960,652.5)
        const contusionX1 = 894;
        const contusionY1 = 582.5;
        const contusionX2 = 960;
        const contusionY2 = 652.5;
        const contusionCenterX = (contusionX1 + contusionX2) / 2;
        const contusionCenterY = (contusionY1 + contusionY2) / 2;
        const contusionWidth = Math.abs(contusionX2 - contusionX1);
        const contusionHeight = Math.abs(contusionY2 - contusionY1);

        const contusion = this.add.rectangle(contusionCenterX, contusionCenterY, contusionWidth, contusionHeight, 0x000000, 0);
        contusion.setStrokeStyle(2, 0x2255cc, 1);
        contusion.setInteractive({ useHandCursor: true });
        contusion.setDepth(5);
        contusion.setData('name', 'contusion');
        contusion.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] contusion click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('scene38_b_1');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
