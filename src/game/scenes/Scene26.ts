import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene26 extends Scene {
    constructor() {
        super('Scene26');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_26');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Debug: show coordinates where user clicks in this scene
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene26 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            const label = this.add.text(pointer.worldX, pointer.worldY, `screen=(${Math.round(pointer.x)},${Math.round(pointer.y)})\nworld=(${Math.round(pointer.worldX)},${Math.round(pointer.worldY)})`, {
                fontSize: '14px', color: '#000000', backgroundColor: 'rgba(255,255,255,0.9)', padding: { x: 6, y: 4 }
            }).setOrigin(0.5).setDepth(1000);
            this.tweens.add({ targets: label, y: label.y - 30, alpha: 0, duration: 1200, ease: 'Cubic.easeOut', onComplete: () => label.destroy() });
        });

        // Rectangular hitbox between (327,323.5) and (1246,586.5)
        const x1 = 327, y1 = 323.5, x2 = 1246, y2 = 586.5;
        const rectW = Math.abs(x2 - x1);
        const rectH = Math.abs(y2 - y1);
        const rectX = (x1 + x2) / 2;
        const rectY = (y1 + y2) / 2;
        const rectZone = this.add.zone(rectX, rectY, rectW, rectH).setOrigin(0.5, 0.5);
        rectZone.setInteractive({ useHandCursor: true });
        rectZone.setDepth(900);
        rectZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene26 rectZone click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY}) - redirecting to Scene27`);
            this.scene.start('Scene27');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
