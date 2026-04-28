import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene7 extends Scene {
	background!: GameObjects.Image;
	hitbox!: GameObjects.Rectangle;

	constructor() {
		super('Scene7');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_7');
		this.background.setDisplaySize(1600, 900);
		this.background.setDepth(0);

		// Top dialog with lab tech speaker
		const topDlgW = 820;
		const topDlgH = 140;
		const topDlgX = 880;
		const topDlgY = 140;
		const topDlg = this.add.rectangle(topDlgX, topDlgY, topDlgW, topDlgH, 0x000000, 0.9).setDepth(20);
		topDlg.setStrokeStyle(2, 0xffffff, 1);

		if (this.textures.exists('lab_tech')) {
			const labX = topDlgX - topDlgW / 2 - 90;
			const lab = this.add.image(labX, topDlgY, 'lab_tech').setDepth(21);
			const targetH = 200;
			const scale = targetH / lab.height;
			lab.setScale(scale);
		} else {
			const ph = this.add.circle(topDlgX - topDlgW / 2 - 90, topDlgY, 36, 0x000000, 0.9).setDepth(21);
			ph.setStrokeStyle(2, 0xffffff, 1);
			this.add.text(ph.x, ph.y, 'Tech', { fontSize: '14px', color: '#ffffff', fontFamily: 'Arial' }).setOrigin(0.5).setDepth(22);
		}

		this.add.text(
			topDlgX,
			topDlgY,
			'Let me remove the cloth doctor.',
			{ fontSize: '22px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: topDlgW - 40 } }
		).setOrigin(0.5).setDepth(21);

		// Bottom instruction dialog
		const bottomDlgW = 640;
		const bottomDlgH = 70;
		const bottomDlgX = 800;
		const bottomDlgY = 840;
		const bottomDlg = this.add.rectangle(bottomDlgX, bottomDlgY, bottomDlgW, bottomDlgH, 0x000000, 0.9).setDepth(20);
		bottomDlg.setStrokeStyle(2, 0xffffff, 1);
		this.add.text(bottomDlgX, bottomDlgY, 'Click on the cloth to proceed', {
			fontSize: '20px',
			color: '#ffffff',
			fontFamily: 'Arial',
			align: 'center'
		}).setOrigin(0.5).setDepth(21);

		// Hitbox from (282,278.5) to (1278,624.5) - redirects to Scene8
		const hitboxX = (282 + 1278) / 2; // 780
		const hitboxY = (278.5 + 624.5) / 2; // 451.5
		const hitboxWidth = 1278 - 282; // 996
		const hitboxHeight = 624.5 - 278.5; // 346

		this.hitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight, 0x000000, 0.001);
		this.hitbox.setStrokeStyle(2, 0x0000ff, 0.75);
		this.hitbox.setDepth(10);
		this.hitbox.setInteractive({ useHandCursor: true });
		this.hitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene7] Hitbox clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.scene.start('Scene8');
		});

		EventBus.emit('current-scene-ready', this);
	}
}
