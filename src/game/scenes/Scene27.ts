import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene27 extends Scene {
    clipboard2?: GameObjects.Image | null = null;
    constructor() {
        super('Scene27');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_27');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // bottom-middle instruction
        this.add.text(800, 820, 'Click to continue', { fontSize: '20px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setOrigin(0.5).setDepth(10);

        // make entire background clickable — toggle clipboard_2 on middle-right
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene27 background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            if (this.clipboard2) {
                this.clipboard2.destroy();
                this.clipboard2 = null;
                return;
            }
            const clip = this.add.image(1105, 457, 'clipboard_2').setDepth(20);
            clip.setDisplaySize(700, 800);
            clip.setOrigin(0.5);
            this.clipboard2 = clip;
        });

        EventBus.emit('current-scene-ready', this);
    }
}
