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

		// Bottom instruction dialog
		const dialogW = 1180;
		const dialogH = 90;
		const dialogX = 800;
		const dialogY = 830;
		const dialogBg = this.add.rectangle(dialogX, dialogY, dialogW, dialogH, 0x000000, 0.9).setDepth(20);
		dialogBg.setStrokeStyle(2, 0xffffff, 1);
		this.add.text(dialogX, dialogY, 'Do not forget: documentation is always important. In this case, your Autopsy Technician will take the photographs as you examine the body.', {
			fontSize: '18px',
			color: '#ffffff',
			fontFamily: 'Arial',
			align: 'center',
			wordWrap: { width: dialogW - 40 }
		}).setOrigin(0.5).setDepth(21);

		// Next button (bottom-right)
		const nextBtnW = 160;
		const nextBtnH = 48;
		const nextBtnX = 1520;
		const nextBtnY = 850;
		const nextBg = this.add.rectangle(nextBtnX, nextBtnY, nextBtnW, nextBtnH, 0x000000, 1).setDepth(25);
		nextBg.setStrokeStyle(2, 0xffffff, 1);
		const nextText = this.add.text(nextBtnX, nextBtnY, 'Next', { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial' })
			.setOrigin(0.5)
			.setDepth(26);
		nextBg.setInteractive({ useHandCursor: true });
		nextText.setInteractive({ useHandCursor: true });
		nextBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[INPUT] Scene9 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene10');
		});
		nextText.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[INPUT] Scene9 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene10');
		});

		// Click anywhere to go to Scene10
		this.background.setInteractive({ useHandCursor: true });
		this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene9] Background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY}) - going to Scene10`);
			this.scene.start('Scene10');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
