import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene6 extends Scene {
	background!: GameObjects.Image;
	hitbox!: GameObjects.Rectangle;

	constructor() {
		super('Scene6');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_6');
		this.background.setDisplaySize(1600, 900);
		this.background.setDepth(0);

		// Top dialog with lab tech speaker
		const topDlgW = 980;
		const topDlgH = 170;
		const topDlgX = 880;
		const topDlgY = 140;
		const topDlg = this.add.rectangle(topDlgX, topDlgY, topDlgW, topDlgH, 0x000000, 0.9).setDepth(20);
		topDlg.setStrokeStyle(2, 0xffffff, 1);

		// Lab tech image to the left of the dialog
		if (this.textures.exists('lab_tech')) {
			const labX = topDlgX - topDlgW / 2 - 90;
			const lab = this.add.image(labX, topDlgY, 'lab_tech').setDepth(21);
			const targetH = 220;
			const scale = targetH / lab.height;
			lab.setScale(scale);
		} else {
			const ph = this.add.circle(topDlgX - topDlgW / 2 - 90, topDlgY, 40, 0x000000, 0.9).setDepth(21);
			ph.setStrokeStyle(2, 0xffffff, 1);
			this.add.text(ph.x, ph.y, 'Tech', { fontSize: '14px', color: '#ffffff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(22);
		}

		this.add.text(
			topDlgX,
			topDlgY,
			'Greetings, Doctor! I am Karl, your Autopsy Technician. I have prepared the body that is requested to be examined on the autopsy table.',
			{ fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: topDlgW - 40 } }
		).setOrigin(0.5).setDepth(21);

		// Bottom instruction dialog
		const bottomDlgW = 760;
		const bottomDlgH = 70;
		const bottomDlgX = 800;
		const bottomDlgY = 840;
		const bottomDlg = this.add.rectangle(bottomDlgX, bottomDlgY, bottomDlgW, bottomDlgH, 0x000000, 0.9).setDepth(20);
		bottomDlg.setStrokeStyle(2, 0xffffff, 1);
		this.add.text(bottomDlgX, bottomDlgY, 'Click on the autopsy table to proceed', {
			fontSize: '20px',
			color: '#ffffff',
			fontFamily: 'Arial',
			align: 'center'
		}).setOrigin(0.5).setDepth(21);

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
