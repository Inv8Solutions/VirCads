import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene55 extends Scene {
    constructor() {
        super('Scene55');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }
        // Debug: log click coordinates (screen and world)
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const sx = Math.round(pointer.x);
            const sy = Math.round(pointer.y);
            const wx = Math.round(pointer.worldX);
            const wy = Math.round(pointer.worldY);
            console.log(`[INPUT] click screen=(${sx},${sy}) world=(${wx},${wy})`);
        });

        // Bottom dialog: prompt user
        const dlgWidth = 900;
        const dlgX = 800;
        const dlgY = 840;
        const dlgPadding = 12;
        const dlgTextStr = 'click on the injury to continue';
        const dlgStyle = { fontSize: '20px', color: '#222', fontFamily: 'Arial', align: 'center', wordWrap: { width: dlgWidth - 32 } } as any;
        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(60);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.95).setDepth(59);
        dlgBg.setStrokeStyle(2, 0x1976d2, 0.08);
        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

        // Blue border hitbox around the injury coordinates
        const p1 = { x: 793, y: 285 };
        const p2 = { x: 838, y: 318 };
        const pad = 12;
        const left = Math.min(p1.x, p2.x) - pad;
        const right = Math.max(p1.x, p2.x) + pad;
        const top = Math.min(p1.y, p2.y) - pad;
        const bottom = Math.max(p1.y, p2.y) + pad;
        const w = right - left;
        const h = bottom - top;
        const cx = left + w / 2;
        const cy = top + h / 2;

        // visible blue stroke
        const g = this.add.graphics().setDepth(70);
        g.lineStyle(4, 0x1976d2, 1);
        g.strokeRect(left, top, w, h);

        // interactive transparent hit area
        const hit = this.add.rectangle(cx, cy, w, h, 0x000000, 0).setOrigin(0.5).setDepth(71).setInteractive({ useHandCursor: true });
        hit.on('pointerdown', () => {
            this.scene.start('Scene56');
        });

   

        EventBus.emit('current-scene-ready', this);
    }
}
