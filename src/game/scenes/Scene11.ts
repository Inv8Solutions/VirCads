import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene11 extends Scene {
	background!: GameObjects.Image;

	constructor() {
		super('Scene11');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_9');
		this.background.setDisplaySize(1600, 900);
        this.background.setDepth(0);

		// Bottom dialog
		const dialogW = 1400;
		const dialogH = 140;
		const dialogX = 800;
		const dialogY = 600;
		const dialogBg = this.add.rectangle(dialogX, dialogY, dialogW, dialogH, 0x000000, 0.9).setDepth(20);
		dialogBg.setStrokeStyle(2, 0xffffff, 1);
		this.add.text(dialogX, dialogY, "In documenting a body, overall shots should be taken first. In doing so, the case number with the examiner's initials and date of examination should be placed on all fours sides of the body: above the head; on the body's left side; below the feet; and on the body's right side, each to be documented separately.", {
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
			console.log(`[INPUT] Scene11 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene12');
		});
		nextText.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[INPUT] Scene11 Next click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene12');
		});

		// Debug: log background clicks and transition to Scene12
		this.background.setInteractive();
		this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene11] Background click screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene12');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
