import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_a_4 extends Scene {
    constructor() {
        super('scene38_a_4');
    }

    create() {
        const bgKey = this.textures.exists('scene_38_a_4') ? 'scene_38_a_4' : 'scene_38';
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Right-side clipboard for laceration info (use specific key if present)
        const clipKey = this.textures.exists('laceration_clipboard') ? 'laceration_clipboard' : (this.textures.exists('clipboard_1') ? 'clipboard_1' : null);
        if (clipKey) {
            const clip = this.add.image(1300 , 450, clipKey).setDepth(20);
            // size clipboard to a reasonable size
            clip.setDisplaySize(750, 600);
        } else {
            // placeholder visual if clipboard image missing
            const ph = this.add.rectangle(1400, 450, 300, 420, 0xf5f5f5).setDepth(20);
            ph.setStrokeStyle(2, 0xcccccc, 1);
            this.add.text(1400, 450, 'Clipboard (missing)', { fontSize: '16px', color: '#333333', align: 'center' }).setOrigin(0.5).setDepth(21);
        }

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_4 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        // Next button (bottom-right) -> go to Scene38_a_5
        const nextX = 1550;
        const nextY = 850;
        const nextKey = this.textures.exists('next_button') ? 'next_button' : null;
        const handleNext = (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene38_a_4 next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
            this.scene.start('scene38_a_5');
        };

        if (nextKey) {
            const nextBtn = this.add.image(nextX, nextY, nextKey).setDepth(30).setOrigin(1, 1);
            nextBtn.setDisplaySize(140, 70);
            nextBtn.setInteractive({ useHandCursor: true });
            nextBtn.on('pointerdown', handleNext);
        } else {
            const nextRect = this.add.rectangle(nextX, nextY, 140, 70, 0x007bff).setDepth(30).setOrigin(1, 1);
            const nextLabel = this.add.text(nextX - 70, nextY - 35, 'Next', { fontSize: '22px', color: '#ffffff' }).setDepth(31).setOrigin(0.5);
            nextRect.setInteractive({ useHandCursor: true });
            nextLabel.setInteractive({ useHandCursor: true });
            nextRect.on('pointerdown', handleNext);
            nextLabel.on('pointerdown', handleNext);
        }

        EventBus.emit('current-scene-ready', this);
    }
}
