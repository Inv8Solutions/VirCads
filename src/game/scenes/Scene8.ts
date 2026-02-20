import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene8 extends Scene {
	background!: GameObjects.Image;
	nextButtonBg!: GameObjects.Rectangle;
	nextButtonText!: GameObjects.Text;

	constructor() {
		super('Scene8');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_8');
		this.background.setDisplaySize(1600, 900);
		this.background.setDepth(0);

		// Debug: log background clicks
		this.background.setInteractive();
		this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene8] Background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
		});

		// Next button on lower right with white bg, black text, black border
		const btnX = 1500;
		const btnY = 850;
		const tmpText = this.add.text(0, 0, 'Next ➜', { fontSize: '32px', color: '#000000' }).setOrigin(0.5, 0.5).setDepth(31);
		const tw = tmpText.width;
		const th = tmpText.height;
		this.nextButtonBg = this.add.rectangle(btnX, btnY, tw + 40, th + 20, 0xffffff).setOrigin(1, 1).setStrokeStyle(2, 0x000000).setDepth(30);
		this.nextButtonText = tmpText.setPosition(btnX - (tw + 40) / 2, btnY - (th + 20) / 2).setDepth(31);
		this.nextButtonBg.setInteractive({ useHandCursor: true });
		this.nextButtonBg.on('pointerover', () => this.nextButtonBg.setFillStyle(0xf6f6f6));
		this.nextButtonBg.on('pointerout', () => this.nextButtonBg.setFillStyle(0xffffff));
		this.nextButtonBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene8] Next button clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY}) -> Scene9`);
			this.scene.start('Scene9');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
