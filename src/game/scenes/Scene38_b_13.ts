import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_13 extends Scene {
    constructor() {
        super('scene38_b_13');
    }

    create() {
                // Bottom-center dialog box
                const botDlgWidth = 700;
                const botDlgHeight = 100;
                const botDlgX = 800;
                const botDlgY = 820;
                const botDlgBg = this.add.rectangle(botDlgX, botDlgY, botDlgWidth, botDlgHeight, 0xffffff, 0.95);
                botDlgBg.setStrokeStyle(2, 0x000000, 1);
                botDlgBg.setDepth(90);
                const botDlgText = this.add.text(botDlgX, botDlgY, 'Anterior head and facial injuries have been fully measured and documented.', {
                    fontFamily: 'Arial',
                    fontSize: '22px',
                    color: '#000000',
                    align: 'center',
                    wordWrap: { width: botDlgWidth - 40 }
                });
                botDlgText.setOrigin(0.5, 0.5);
                botDlgText.setDepth(91);
        const bgKey = this.textures.exists('scene_38_b_13') ? 'scene_38_b_13' : (this.textures.exists('scene_38_b_12') ? 'scene_38_b_12' : 'scene_38');
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

       
        // Debug: log pointer coordinates and place a temporary marker for clicks
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const sx = Math.round(pointer.x);
            const sy = Math.round(pointer.y);
            const wx = Math.round(pointer.worldX);
            const wy = Math.round(pointer.worldY);
            console.log(`[INPUT] scene38_b_13 click screen=(${sx},${sy}) world=(${wx},${wy})`);
            EventBus.emit('debug-coordinate', { screen: { x: sx, y: sy }, world: { x: wx, y: wy } });
            const mark = this.add.circle(pointer.worldX, pointer.worldY, 6, 0xff0000).setDepth(100);
            this.time.delayedCall(1500, () => mark.destroy());
        });

        // Top-center dialog styled like Scene38/Scene36
        const dlgWidth = 520;
        const dlgHeight = 80;
        const dlgX = 800;
        const dlgY = 80;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.95);
        dlgBg.setStrokeStyle(2, 0x000000, 1);
        dlgBg.setDepth(90);
        const dlgText = this.add.text(dlgX, dlgY, 'Click on the injury to start', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: dlgWidth - 40 }
        });
        dlgText.setOrigin(0.5, 0.5);
        dlgText.setDepth(91);

        // Blue stroked hitbox (no fill) covering coordinates (738,534) to (688,572)
        const hitX1 = 738;
        const hitY1 = 534;
        const hitX2 = 688;
        const hitY2 = 572;
        const hx = Math.min(hitX1, hitX2);
        const hy = Math.min(hitY1, hitY2);
        const hw = Math.abs(hitX1 - hitX2);
        const hh = Math.abs(hitY1 - hitY2);
        const hitbox = this.add.rectangle(hx + hw / 2, hy + hh / 2, hw, hh, 0x000000, 0)
            .setDepth(80)
            .setInteractive({ useHandCursor: true });
        hitbox.setStrokeStyle(3, 0x0000ff, 1);
        hitbox.on('pointerdown', () => {
            console.log('[INPUT] scene38_b_13 hitbox clicked — navigating to scene38_a_1');
            this.scene.start('scene38_a_1');
        });
        EventBus.emit('current-scene-ready', this);
    }
}
