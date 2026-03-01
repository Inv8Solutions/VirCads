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
        const clickText = this.add.text(800, 820, 'Click to continue', { fontSize: '20px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(10);

        // make entire background clickable — first click shows clipboard
        bg.setInteractive({ useHandCursor: true });
        let clipboardShown = false;
        bg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene27 background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            if (!clipboardShown) {
                // First click: hide instructions, show clipboard
                clipboardShown = true;
                clickText.destroy();
                const clip = this.add.image(1105, 457, 'clipboard_2').setDepth(20);
                clip.setDisplaySize(700, 800);
                clip.setOrigin(0.5);
                // Show new "Click to continue" text for the second click
                this.add.text(800, 820, 'Click to continue', { fontSize: '20px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(10);
            } else {
                // Second click: go to next scene
                this.scene.start('Scene28');
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
