import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene36 extends Scene {
    constructor() {
        super('Scene36');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_35');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // top hint
        const topHint = this.add.text(800, 16, 'Click anywhere to continue', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5, 0).setDepth(60);

       // Dialog and lab tech
        const dialogWidth = 920;
        const dialogHeight = 160;
        // set dialog top-left to (367, 671.5)
        const dialogX = 367 + dialogWidth / 2;
        const dialogY = 671.5 + dialogHeight / 2;

        // lab tech lower-left
        const labTechX = 180;
        const labTechY = 900 - 40;
        const labTech = this.add.image(labTechX, labTechY, 'lab_tech');
        labTech.setDisplaySize(400, 420);
        labTech.setOrigin(0.5, 1);
        labTech.setDepth(53);

        const dialogGfx = this.add.graphics().setDepth(52);
        // Outer dark navy border
        dialogGfx.fillStyle(0x1a3a8f, 1);
        dialogGfx.fillRoundedRect(dialogX - dialogWidth / 2 - 6, dialogY - dialogHeight / 2 - 6, dialogWidth + 12, dialogHeight + 12, 10);
        // Inner blue fill
        dialogGfx.fillStyle(0x2255cc, 1);
        dialogGfx.fillRoundedRect(dialogX - dialogWidth / 2, dialogY - dialogHeight / 2, dialogWidth, dialogHeight, 8);
        // Invisible rect kept for sizing reference
        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0x000000, 0).setDepth(52);

        const dialogTextX = dialogX - dialogWidth / 2 + 40;
        const dialogText = this.add.text(dialogTextX, dialogY, 'Doctor, the body sustained a number of ten visible injuries.', {
            fontSize: '20px',
            color: '#ffffff',
            fontStyle: 'italic',
            wordWrap: { width: dialogWidth - 80 }
        }).setOrigin(0, 0.5).setDepth(54);
        bg.setInteractive({ useHandCursor: true });
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(
                `[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`
            );
            try {
                this.scene.start('Scene37');
            } catch (e) {
                console.warn('[Scene36] failed to start Scene37', e);
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
