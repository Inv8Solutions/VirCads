import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene56 extends Scene {
    constructor() {
        super('Scene56');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else if (this.textures.exists('scene_56')) {
            const bg = this.add.image(800, 450, 'scene_56');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Right-side clipboard (full height)
        if (this.textures.exists('clipboard_7')) {
            const clipWidth = 450;
            const clipHeight = 900;
            const clipX = 1600 - clipWidth / 2;
            const clip = this.add.image(clipX, 450, 'clipboard_7');
            clip.setDisplaySize(clipWidth, clipHeight);
            clip.setDepth(80);
        }

        // Bottom area: centered "Next" button
        const dlgX = 800;
        const dlgY = 840;
        const btnWidth = 360;
        const btnHeight = 48;
        const btnBg = this.add.rectangle(dlgX, dlgY, btnWidth, btnHeight, 0x3B82F6, 1).setDepth(59);
        btnBg.setStrokeStyle(4, 0x000000, 1);
        btnBg.setInteractive({ useHandCursor: true });
        const btnTextStyle = { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', align: 'center' } as any;
        this.add.text(dlgX, dlgY, 'Next', btnTextStyle).setOrigin(0.5).setDepth(60);
        btnBg.on('pointerdown', () => {
            this.scene.start('Scene57');
        });

        // Click debug: log screen and world coordinates on pointer down
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${Math.round(pointer.x)},${Math.round(pointer.y)}) world=(${Math.round(pointer.worldX)},${Math.round(pointer.worldY)})`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
