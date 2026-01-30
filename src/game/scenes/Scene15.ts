import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene15 extends Scene {
	background!: GameObjects.Image;

	constructor() {
		super('Scene15');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_15');
		this.background.setDepth(0);

		// Debug: log background clicks
		this.background.setInteractive();
		this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene15] Background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
		});

		EventBus.emit('current-scene-ready', this);
	}
}
