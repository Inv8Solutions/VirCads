import { Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene38_b_13 extends Scene {
    constructor() {
        super('scene38_b_13');
    }

    create() {
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

        // Top-center dialog instructing user
        const topDlgWidth = 420;
        const topDlgPadding = 10;
        const topTextStr = 'click on the injury to start';
        const topStyle = { fontSize: '18px', color: '#ffffff', align: 'center', wordWrap: { width: topDlgWidth - 24 } };
        const topText = this.add.text(800, 40 - topDlgPadding, topTextStr, topStyle).setOrigin(0.5, 0).setDepth(90);
        const topBounds = topText.getBounds();
        const topBgH = topBounds.height + topDlgPadding * 2;
        const topBg = this.add.rectangle(800, 40, topDlgWidth, topBgH, 0x000000, 0.6).setDepth(89);
        topBg.setStrokeStyle(2, 0xffffff, 0.08);
        topText.setPosition(800, 40 - topBgH / 2 + topDlgPadding);

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
