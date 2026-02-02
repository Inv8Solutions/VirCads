import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene11 extends Scene {
	background!: GameObjects.Image;

	constructor() {
		super('Scene11');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_11');
		this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

		// Debug: log background clicks and transition to Scene12
		this.background.setInteractive();
		this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene11] Background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene12');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
