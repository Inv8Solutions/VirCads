import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene45 extends Scene {
    constructor() {
        super('Scene45');
    }

    create() {
                // Dialog box instruction (bottom middle)
                const dlgWidth = 700;
                const dlgX = 800;
                const dlgY = 840;
                const dlgPadding = 16;
                const dlgTextStr = 'Take the Autopsy Probe Stick from the tray of post-mortem examination tools.';
                const dlgStyle = { fontSize: '22px', color: '#222', fontFamily: 'Arial', align: 'center', wordWrap: { width: dlgWidth - 32 } };
                const dlgText = this.add.text(dlgX, 0, dlgTextStr, dlgStyle).setOrigin(0.5, 0).setDepth(60);
                const dlgBounds = dlgText.getBounds();
                const dlgHeight = dlgPadding * 2 + dlgBounds.height;
                const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.92)
                    .setDepth(59);
                dlgBg.setStrokeStyle(2, 0x222222, 0.08);
                const dlgTop = dlgY - dlgHeight / 2 + dlgPadding;
                dlgText.setPosition(dlgX, dlgTop);

                // Transparent hitbox
                const hx1 = 1232;
                const hy1 = 323.5;
                const hx2 = 1348;
                const hy2 = 440.5;
                const hitboxWidth = Math.abs(hx2 - hx1);
                const hitboxHeight = Math.abs(hy2 - hy1);
                const hitboxX = (hx1 + hx2) / 2;
                const hitboxY = (hy1 + hy2) / 2;
                const hitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight, 0x000000, 0)
                    .setOrigin(0.5)
                    .setDepth(100)
                    .setInteractive({ useHandCursor: true });
                hitbox.on('pointerdown', () => {
                    EventBus.emit('scene-switch', { from: 'Scene45', to: 'Scene56' });
                });
        // Background image: scene_38_b_6 (match Scene38_b_6)
        if (this.textures.exists('scene_38_b_6')) {
            const bg = this.add.image(800, 450, 'scene_38_b_6');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#e3f2fd');
        }

        // Log input for dev/debug
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] Scene45 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        

        EventBus.emit('current-scene-ready', this);
    }
}
