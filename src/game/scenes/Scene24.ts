import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene24 extends Scene {
    graphics!: Phaser.GameObjects.Graphics;
    startPoint: { x: number; y: number } | null = null;
    measuring = false;
    infoText!: GameObjects.Text;
    instructionText!: GameObjects.Text;

    constructor() {
        super('Scene24');
    }

    create() {
        // semi-transparent overlay so user knows they're in a tool
        this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.25).setDepth(0);

        this.graphics = this.add.graphics({ x: 0, y: 0 }).setDepth(5);

        this.instructionText = this.add.text(20, 20, 'Click and drag to measure distance. Click "Back" to return.', {
            fontSize: '18px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 }
        }).setDepth(10);

        this.infoText = this.add.text(20, 60, 'Distance: —', { fontSize: '20px', color: '#ffff00' }).setDepth(10);

        const back = this.add.text(1520, 20, 'Back', { fontSize: '20px', color: '#00ff00', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 8, y: 6 } }).setDepth(10);
        back.setInteractive({ useHandCursor: true });
        back.on('pointerdown', () => {
            this.scene.start('Scene23');
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // start measuring
            this.measuring = true;
            this.startPoint = { x: pointer.worldX, y: pointer.worldY };
            this.graphics.clear();
        });

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!this.measuring || !this.startPoint) return;
            this.graphics.clear();
            this.graphics.lineStyle(4, 0xff0000, 1);
            this.graphics.beginPath();
            this.graphics.moveTo(this.startPoint.x, this.startPoint.y);
            this.graphics.lineTo(pointer.worldX, pointer.worldY);
            this.graphics.strokePath();

            // draw endpoints
            this.graphics.fillStyle(0xffffff, 1);
            this.graphics.fillCircle(this.startPoint.x, this.startPoint.y, 6);
            this.graphics.fillCircle(pointer.worldX, pointer.worldY, 6);

            const dist = Phaser.Math.Distance.Between(this.startPoint.x, this.startPoint.y, pointer.worldX, pointer.worldY);
            this.infoText.setText(`Distance: ${Math.round(dist)} px`);
        });

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            if (!this.measuring || !this.startPoint) return;
            this.measuring = false;
            // leave the final measurement drawn; user can click Back to exit or start a new measurement
            const dist = Phaser.Math.Distance.Between(this.startPoint.x, this.startPoint.y, pointer.worldX, pointer.worldY);
            this.infoText.setText(`Distance: ${Math.round(dist)} px`);
        });

        EventBus.emit('current-scene-ready', this);
    }
}
