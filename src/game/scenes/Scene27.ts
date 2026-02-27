import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene27 extends Scene {
    constructor() {
        super('Scene27');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_27');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // bottom-middle instruction
        this.add.text(800, 820, 'Click to continue', { fontSize: '20px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(10);

        // Show clipboard immediately on scene load
        const clip = this.add.image(1105, 457, 'clipboard_2').setDepth(20);
        clip.setDisplaySize(700, 800);
        clip.setOrigin(0.5);

        // make entire background clickable — go to Scene28
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene27 background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene28');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
