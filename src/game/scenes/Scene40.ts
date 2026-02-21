import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene40 extends Scene {
    constructor() {
        super('scene40');
    }

    create() {
        // Use scene_40 explicitly when available
        const bgKey = this.textures.exists('scene_40') ? 'scene_40' : (this.textures.exists('scene_39') ? 'scene_39' : 'scene_38');
        const bg = this.add.image(800, 450, bgKey);
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);

        // Add clipboard_4.png matching other scenes (position and size)
        if (this.textures.exists('clipboard_4')) {
            const clipboard = this.add.image(1300, 308, 'clipboard_4');
            clipboard.setOrigin(0.5, 0.5);
            clipboard.setDisplaySize(400, 520);
            clipboard.setDepth(1);
        } else {
            console.warn('clipboard_4.png not loaded in Boot.ts');
        }

        // Top-center dialog styled like other scenes
        const dlgWidth = 520;
        const dlgHeight = 80;
        const dlgX = 800;
        const dlgY = 80;
        const dlgBg = this.add.rectangle(dlgX, dlgY, dlgWidth, dlgHeight, 0xffffff, 0.95);
        dlgBg.setStrokeStyle(2, 0x000000, 1);
        dlgBg.setDepth(90);
        const dlgText = this.add.text(dlgX, dlgY, 'Tap the injury to inspect', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: dlgWidth - 40 }
        });
        dlgText.setOrigin(0.5, 0.5);
        dlgText.setDepth(91);

        
        // global click logging for debugging
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene40 click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });
        });

        // Hitbox covering the specified coordinates — transfers Next-button functionality here
        const hitX1 = 857;
        const hitY1 = 318.5;
        const hitX2 = 908;
        const hitY2 = 403.5;
        const hx = Math.min(hitX1, hitX2);
        const hy = Math.min(hitY1, hitY2);
        const hw = Math.abs(hitX1 - hitX2);
        const hh = Math.abs(hitY1 - hitY2);
        const hitbox = this.add.rectangle(hx + hw / 2, hy + hh / 2, hw, hh, 0x000000, 0).setDepth(5)
            .setInteractive({ useHandCursor: true });
        // optional visible outline for debugging; kept as stroke so input still works when alpha=0
        hitbox.setStrokeStyle(3, 0x0000ff, 1);
        hitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[INPUT] scene40 hitbox click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
            EventBus.emit('debug-coordinate', { screen: { x: Math.round(pointer.x), y: Math.round(pointer.y) }, world: { x: Math.round(pointer.worldX), y: Math.round(pointer.worldY) } });

            // Prefer explicit next scene 'scene41' — fall back to dynamic next if missing
            if (this.scene.get('scene41')) {
                this.scene.start('scene41');
                return;
            }

            try {
                const scenes = this.game.scene.scenes.map((s: Phaser.Scene) => s.scene.key);
                const idx = scenes.indexOf(this.scene.key);
                const nextKey = (idx >= 0 && idx < scenes.length - 1) ? scenes[idx + 1] : null;
                if (nextKey) {
                    this.scene.start(nextKey);
                } else {
                    console.warn('[Scene40] No next scene registered to navigate to');
                }
            } catch (e) {
                console.warn('[Scene40] failed to navigate to next scene', e);
            }
        });

        EventBus.emit('current-scene-ready', this);
    }
}
