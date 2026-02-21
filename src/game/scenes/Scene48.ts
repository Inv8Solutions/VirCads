import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene48 extends Scene {
    constructor() {
        super('Scene48');
    }

    create() {
        // Use scene_38_b_6 as the background for this scene if available
        if (this.textures.exists('scene_38_b_6')) {
            const bg = this.add.image(800, 450, 'scene_38_b_6');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Dialog instruction (bottom middle)
        const dlgWidth = 900;
        const dlgX = 800;
        const dlgY = 840;
        const dlgPadding = 16;
        const dlgTextStr = 'Take the Measuring tape from the tray of post-mortem examination tools.';
        const dlgStyle = { fontSize: '22px', color: '#222', fontFamily: 'Arial', align: 'center', wordWrap: { width: dlgWidth - 32 } };
        const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(60);
        const dlgBounds = dlgText.getBounds();
        const dlgHeight = dlgPadding * 2 + dlgBounds.height;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.95).setDepth(59);
        dlgBg.setStrokeStyle(2, 0x222222, 0.08);
        const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
        dlgText.setPosition(dlgX, dlgTop);

                // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene42 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });
        
            // Add interactive hitbox that redirects to Scene49
            // Coordinates provided: (1142,206.5) -> (1322,296.5)
            const hx1 = 1142, hy1 = 206.5, hx2 = 1322, hy2 = 296.5;
            const hitX = (hx1 + hx2) / 2; // 1232
            const hitY = (hy1 + hy2) / 2; // 251.5
            const hitW = Math.abs(hx2 - hx1); // 180
            const hitH = Math.abs(hy2 - hy1); // 90

            const nextHit = this.add.rectangle(hitX, hitY, hitW, hitH, 0x000000, 0)
                .setOrigin(0.5)
                .setDepth(100)
                .setInteractive({ useHandCursor: true });

            nextHit.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                console.log(`[INPUT] click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
                // optional visual feedback
                const flash = this.add.rectangle(hitX, hitY, hitW, hitH, 0xffffff, 0.2).setDepth(101);
                this.tweens.add({ targets: flash, alpha: 0, duration: 200, onComplete: () => flash.destroy() });
                this.scene.start('Scene49');
            });

            EventBus.emit('current-scene-ready', this);
    }
}
