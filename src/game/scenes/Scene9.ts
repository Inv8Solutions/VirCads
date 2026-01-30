import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene9 extends Scene {
	background!: GameObjects.Image;

	constructor() {
		super('Scene9');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_9');
		this.background.setDisplaySize(1600, 900);
		this.background.setDepth(0);

		// Click anywhere to go to Scene10
		this.background.setInteractive({ useHandCursor: true });
		this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene9] Background click screen=(${pointer.x},${pointer.y}) - going to Scene10`);
			this.scene.start('Scene10');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
