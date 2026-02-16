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

        const topDialogBg = this.add.rectangle(topDialogX, topDialogY, topDialogWidth, topDialogHeight, 0x111111, 0.92);
        topDialogBg.setStrokeStyle(2, 0xffffff, 0.08);
        topDialogBg.setDepth(10);

        this.add.text(topDialogX, topDialogY, 'click on the injury you want to inspect', {
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: topDialogWidth - 24 }
        }).setOrigin(0.5, 0.5).setDepth(11);

        // click debug logging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        // Add invisible interactive hitboxes for injuries
        // Pair 1: laceration between (688,535.5) and (733,579.5)
        const lacerationX1 = 688;
        const lacerationY1 = 535.5;
        const lacerationX2 = 733;
        const lacerationY2 = 579.5;
        const lacerationCenterX = (lacerationX1 + lacerationX2) / 2;
        const lacerationCenterY = (lacerationY1 + lacerationY2) / 2;
        const lacerationWidth = Math.abs(lacerationX2 - lacerationX1);
        const lacerationHeight = Math.abs(lacerationY2 - lacerationY1);

        const laceration = this.add.rectangle(lacerationCenterX, lacerationCenterY, lacerationWidth, lacerationHeight, 0xff0000, 0);
        laceration.setInteractive({ useHandCursor: true });
        laceration.setAlpha(0);
        laceration.setDepth(5);
        laceration.setData('name', 'laceration');
        laceration.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] laceration click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('scene38_a_1');
        });

        // Draw a visible blue border for the laceration hitbox (for debugging/visibility)
        const debugLaceration = this.add.graphics();
        debugLaceration.lineStyle(2, 0x0000ff, 0.9);
        debugLaceration.strokeRect(
            lacerationCenterX - lacerationWidth / 2,
            lacerationCenterY - lacerationHeight / 2,
            lacerationWidth,
            lacerationHeight
        );
        debugLaceration.setDepth(6);

        // Pair 2: contusion between (894,582.5) and (960,652.5)
        const contusionX1 = 894;
        const contusionY1 = 582.5;
        const contusionX2 = 960;
        const contusionY2 = 652.5;
        const contusionCenterX = (contusionX1 + contusionX2) / 2;
        const contusionCenterY = (contusionY1 + contusionY2) / 2;
        const contusionWidth = Math.abs(contusionX2 - contusionX1);
        const contusionHeight = Math.abs(contusionY2 - contusionY1);

        const contusion = this.add.rectangle(contusionCenterX, contusionCenterY, contusionWidth, contusionHeight, 0x0000ff, 0);
        contusion.setInteractive({ useHandCursor: true });
        contusion.setAlpha(0);
        contusion.setDepth(5);
        contusion.setData('name', 'contusion');
        contusion.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] contusion click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('scene38_b_1');
        });

        // Draw a visible blue border for the contusion hitbox (for debugging/visibility)
        const debugContusion = this.add.graphics();
        debugContusion.lineStyle(2, 0x0000ff, 0.9);
        debugContusion.strokeRect(
            contusionCenterX - contusionWidth / 2,
            contusionCenterY - contusionHeight / 2,
            contusionWidth,
            contusionHeight
        );
        debugContusion.setDepth(6);

        EventBus.emit('current-scene-ready', this);
    }
}
