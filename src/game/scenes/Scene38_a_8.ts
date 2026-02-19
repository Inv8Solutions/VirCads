import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_8 extends Scene {
    constructor() {
        super('scene38_a_8');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_b_11') ? 'scene_38_b_11' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Instruction dialog instructing how to inspect the wound
        const dialogWidth = 760;
        const dialogHeight = 80;
        const dialogX = 800;
        const dialogY = 140;

        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0x000000, 0.92).setDepth(200);
        dialogBg.setStrokeStyle(2, 0xffffff, 0.08);

        this.add.text(dialogX, dialogY, 'Gently separate the wound edges using your thumb and index finger to inspect the wound', {
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: dialogWidth - 24 }
        }).setOrigin(0.5, 0.5).setDepth(201);

        // Bottom instruction dialog prompting user to click the laceration
        const bottomDialogWidth = 760;
        const bottomDialogHeight = 64;
        const bottomDialogX = 800;
        const bottomDialogY = 820;

        const bottomBg = this.add.rectangle(bottomDialogX, bottomDialogY, bottomDialogWidth, bottomDialogHeight, 0x000000, 0.92).setDepth(200);
        bottomBg.setStrokeStyle(2, 0xffffff, 0.08);

        this.add.text(bottomDialogX, bottomDialogY, 'click on the laceration to open up the wound', {
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: bottomDialogWidth - 24 }
        }).setOrigin(0.5, 0.5).setDepth(201);

        // Laceration hitbox (blue) — coordinates provided as two corners
        const lx1 = 702;
        const ly1 = 298.5;
        const lx2 = 661;
        const ly2 = 347.5;
        const minX = Math.min(lx1, lx2);
        const maxX = Math.max(lx1, lx2);
        const minY = Math.min(ly1, ly2);
        const maxY = Math.max(ly1, ly2);
        const hitW = Math.max(1, maxX - minX);
        const hitH = Math.max(1, maxY - minY);
        const hitX = minX + hitW / 2;
        const hitY = minY + hitH / 2;

        const lacerationHit = this.add.rectangle(hitX, hitY, hitW, hitH, 0x0000ff, 0).setDepth(300);
        lacerationHit.setStrokeStyle(2, 0x0000ff, 1);
        lacerationHit.setInteractive({ useHandCursor: true });
        lacerationHit.on('pointerdown', () => {
            console.log('[INPUT] scene38_a_8 laceration hitbox clicked');
            this.scene.start('scene38_a_9');
        });
        // global click logging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_8 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
