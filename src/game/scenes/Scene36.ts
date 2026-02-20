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

        const dialogBg = this.add.rectangle(dialogX, dialogY, dialogWidth, dialogHeight, 0xffffff, 0.95).setDepth(52).setStrokeStyle(2, 0x000000, 1);

        const dialogTextX = dialogX - dialogWidth / 2 + 40;
        const dialogText = this.add.text(dialogTextX, dialogY, 'Doctor, the body sustained a number of ten visible injuries.', {
            fontSize: '20px',
            color: '#000000',
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
