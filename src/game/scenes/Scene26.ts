import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene26 extends Scene {
    constructor() {
        super('Scene26');
    }

    create() {
        const bg = this.add.image(800, 450, 'scene_23');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Top dialog with lab tech speaker
        const topDlgW = 1040;
        const topDlgH = 170;
        const topDlgX = 880;
        const topDlgY = 140;
        const topDlg = this.add.rectangle(topDlgX, topDlgY, topDlgW, topDlgH, 0x000000, 0.9).setDepth(20);
        topDlg.setStrokeStyle(2, 0xffffff, 1);

        if (this.textures.exists('lab_tech')) {
            const labX = topDlgX - topDlgW / 2 - 90;
            const lab = this.add.image(labX, topDlgY, 'lab_tech').setDepth(21);
            const targetH = 220;
            const scale = targetH / lab.height;
            lab.setScale(scale);
        } else {
            const ph = this.add.circle(topDlgX - topDlgW / 2 - 90, topDlgY, 40, 0x000000, 0.9).setDepth(21);
            ph.setStrokeStyle(2, 0xffffff, 1);
            this.add.text(ph.x, ph.y, 'Tech', { fontSize: '14px', color: '#ffffff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(22);
        }

        this.add.text(
            topDlgX,
            topDlgY,
            'Should we now turn the body for us to document its posterior view, Doctor?',
            { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: topDlgW - 40 } }
        ).setOrigin(0.5).setDepth(21);

        // Bottom instruction dialog
        const bottomDlgW = 720;
        const bottomDlgH = 70;
        const bottomDlgX = 800;
        const bottomDlgY = 840;
        const bottomDlg = this.add.rectangle(bottomDlgX, bottomDlgY, bottomDlgW, bottomDlgH, 0x000000, 0.9).setDepth(20);
        bottomDlg.setStrokeStyle(2, 0xffffff, 1);
        this.add.text(bottomDlgX, bottomDlgY, 'Click on the body to turn the body around', {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5).setDepth(21);

        // Debug: show coordinates where user clicks in this scene
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene26 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
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
