import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene8 extends Scene {
	background!: GameObjects.Image;
	nextButton!: GameObjects.Text;

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

		// Next button on lower right
		this.nextButton = this.add.text(1500, 850, 'Next ➜', {
			fontSize: '32px',
			color: '#ffffff',
			backgroundColor: '#007700',
			padding: { x: 20, y: 10 }
		});
		this.nextButton.setOrigin(1, 1);
		this.nextButton.setDepth(30);
		this.nextButton.setInteractive({ useHandCursor: true });
		this.nextButton.on('pointerover', () => this.nextButton.setStyle({ backgroundColor: '#00aa00' }));
		this.nextButton.on('pointerout', () => this.nextButton.setStyle({ backgroundColor: '#007700' }));
		this.nextButton.on('pointerdown', () => {
			console.log('[Scene8] Next button clicked, going to Scene9');
			this.scene.start('Scene9');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
