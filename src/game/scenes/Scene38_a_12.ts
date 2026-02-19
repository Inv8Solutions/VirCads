import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene38_a_12 extends Scene {
    constructor() {
        super('scene38_a_12');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_9') ? 'scene_38_a_9' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Dialog box
        const dialogWidth = 700;
        const dialogHeight = 160;
        const dialogX = 800;
        const dialogY = 650;
        const dialog = this.add.graphics();
        dialog.fillStyle(0xffffff, 0.98);
        dialog.lineStyle(3, 0x222222, 1);
        dialog.fillRoundedRect(dialogX - dialogWidth/2, dialogY - dialogHeight/2, dialogWidth, dialogHeight, 24);
        dialog.strokeRoundedRect(dialogX - dialogWidth/2, dialogY - dialogHeight/2, dialogWidth, dialogHeight, 24);
        dialog.setDepth(10);

        // Dialog text
        const dialogText = this.add.text(dialogX, dialogY - 20, 'Anterior head and facial injuries have been fully measured and documented.', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#222',
            align: 'center',
            wordWrap: { width: dialogWidth - 60 }
        });
        dialogText.setOrigin(0.5, 0.5);
        dialogText.setDepth(11);

        // Next button
        const nextBtn = this.add.rectangle(dialogX + dialogWidth/2 - 110, dialogY + dialogHeight/2 - 40, 160, 56, 0x0099ff, 1)
            .setStrokeStyle(2, 0x005577)
            .setDepth(12)
            .setInteractive({ useHandCursor: true });
        const nextText = this.add.text(dialogX + dialogWidth/2 - 110, dialogY + dialogHeight/2 - 40, 'Next', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#fff',
            fontStyle: 'bold'
        });
        nextText.setOrigin(0.5, 0.5);
        nextText.setDepth(13);
        nextBtn.on('pointerdown', () => {
            this.scene.start('scene38_a_13');
        });

        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_12 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        EventBus.emit('current-scene-ready', this);
    }
}
