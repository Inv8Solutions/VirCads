import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene50_a_1 extends Scene {
    constructor() {
        super('Scene50_a_1');
    }

    create() {
        if (this.textures.exists('scene_50_a_1')) {
            const bg = this.add.image(800, 450, 'scene_50_a_1');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else if (this.textures.exists('scene_46')) {
            const bg = this.add.image(800, 450, 'scene_46');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Top-center instruction dialog: "click on the injury to continue"
        const topW = 760;
        const topH = 56;
        const topX = 800;
        const topY = 64;
        const topBg = this.add.rectangle(topX, topY, topW, topH, 0xffffff, 0.96).setOrigin(0.5).setDepth(20);
        topBg.setStrokeStyle(2, 0x000000, 1);
        this.add.text(topX, topY, 'click on the injury to continue', { fontSize: '20px', color: '#000', fontFamily: 'Arial' })
            .setOrigin(0.5).setDepth(21);

        // Debug: log click screen and world coordinates
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
        });

        // Hitbox for the injury (blue border) — coordinates provided by user
        const hx1 = 1222;
        const hy1 = 564.5;
        const hx2 = 1298;
        const hy2 = 627.5;
        const hitCx = (hx1 + hx2) / 2;
        const hitCy = (hy1 + hy2) / 2;
        const hitW = hx2 - hx1;
        const hitH = hy2 - hy1;
        const injuryHit = this.add.rectangle(hitCx, hitCy, hitW, hitH, 0x0000ff, 0).setOrigin(0.5).setDepth(30);
        injuryHit.setStrokeStyle(2, 0x0000ff, 1);
        injuryHit.setInteractive({ useHandCursor: true });
        injuryHit.on('pointerover', () => injuryHit.setAlpha(0.6));
        injuryHit.on('pointerout', () => injuryHit.setAlpha(1));
        injuryHit.on('pointerdown', (p: Phaser.Input.Pointer) => {
            console.log(`[INPUT] injury hit clicked screen=(${p.x},${p.y}) world=(${p.worldX},${p.worldY})`);
            this.scene.start('Scene50_a_2');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
