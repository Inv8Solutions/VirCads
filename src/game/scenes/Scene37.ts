import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene37 extends Scene {
    constructor() {
        super('Scene37');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_35');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // top hint
        const topHint = this.add.text(800, 16, 'click on head to zoom', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5, 0).setDepth(10);

        // dialog
        const dialogWidth = 720;
        const dialogHeight = 140;
        // set dialog top-left to (417, 690.5)
        const dialogX = 417 + dialogWidth / 2;
        const dialogY = 690.5 + dialogHeight / 2;

        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0x111111, 0.92);
        dialogBg.setStrokeStyle(2, 0xffffff, 0.08);
        dialogBg.setDepth(11);

        const dialogTextX = dialogX - dialogWidth / 2 + 24;
        this.add.text(dialogTextX, dialogY, 'Start examining injuries from head to toe.', {
            fontSize: '20px',
            color: '#ffffff',
            wordWrap: { width: dialogWidth - 48 }
        }).setOrigin(0, 0.5).setDepth(12);

        // click debug logging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        // hitbox: red border around provided coordinates (403,411.5) -> (519,487.5)
        const hx1 = 403;
        const hy1 = 411.5;
        const hx2 = 519;
        const hy2 = 487.5;
        const hitW = hx2 - hx1;
        const hitH = hy2 - hy1;
        const hitX = hx1 + hitW / 2;
        const hitY = hy1 + hitH / 2;

        const hitbox = this.add.rectangle(hitX, hitY, hitW, hitH, 0x000000, 0);
        hitbox.setStrokeStyle(3, 0xff0000, 1);
        hitbox.setDepth(20);
        hitbox.setInteractive({ useHandCursor: true });
        hitbox.on('pointerdown', () => {
            console.log('[Scene37] hitbox clicked');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
