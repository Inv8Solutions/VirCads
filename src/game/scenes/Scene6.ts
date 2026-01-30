import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene6 extends Scene {
	background!: GameObjects.Image;
	hitbox!: GameObjects.Rectangle;

	constructor() {
		super('Scene6');
	}

	preload() {
		this.load.image('scene_6', 'src/gameassets/scene_6.png');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_6');
		this.background.setDisplaySize(1600, 900);
		this.background.setDepth(0);

		// Hitbox from (120,451.5) to (656,631.5) - redirects to Scene7
		const hitboxX = (120 + 656) / 2; // 388
		const hitboxY = (451.5 + 631.5) / 2; // 541.5
		const hitboxWidth = 656 - 120; // 536
		const hitboxHeight = 631.5 - 451.5; // 180

		this.hitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight, 0x000000, 0.001);
		this.hitbox.setStrokeStyle(2, 0x0000ff, 0.75);
		this.hitbox.setDepth(10);
		this.hitbox.setInteractive({ useHandCursor: true });
		this.hitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene6] Hitbox clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene7');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
