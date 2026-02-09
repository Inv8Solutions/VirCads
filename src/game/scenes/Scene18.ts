import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene18 extends Scene {
    background!: GameObjects.Image;
    textBox!: GameObjects.Text;
    flashOverlay!: GameObjects.Rectangle;

    constructor() {
        super('Scene18');
    }

    create() {
        this.background = this.add.image(800, 450, 'scene_18');
        this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

        this.flashOverlay = this.add.rectangle(800, 450, 1600, 900, 0xffffff);
        this.flashOverlay.setDepth(100);
        this.tweens.add({
            targets: this.flashOverlay,
            alpha: { from: 1, to: 0 },
            duration: 300,
            ease: 'Power2',
            onComplete: () => { this.flashOverlay.destroy(); }
        });

        this.textBox = this.add.text(800, 800, 'Click to continue', {
            fontSize: '32px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 20, y: 10 }, align: 'center'
        });
        this.textBox.setOrigin(0.5, 0.5);
        this.textBox.setDepth(10);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            this.scene.start('Scene19');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
