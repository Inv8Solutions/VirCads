import { GameObjects, Scene } from 'phaser';

export class Scene5 extends Scene {
	background!: GameObjects.Image;
	labgowns!: GameObjects.Rectangle;
	faceMask!: GameObjects.Rectangle;
	gloves!: GameObjects.Rectangle;
	faceShield!: GameObjects.Rectangle;
	lineGraphics!: GameObjects.Graphics;
	labgownsCheck!: GameObjects.Text;
	faceMaskCheck!: GameObjects.Text;
	glovesCheck!: GameObjects.Text;
	faceShieldCheck!: GameObjects.Text;
	labgownsHitboxCheck!: GameObjects.Text;
	faceMaskHitboxCheck!: GameObjects.Text;
	glovesHitboxCheck!: GameObjects.Text;
	faceShieldHitboxCheck!: GameObjects.Text;
	nextButton!: GameObjects.Text;

	// Track clicked state
	clickedState = {
		labgowns: false,
		faceMask: false,
		gloves: false,
		faceShield: false
	};

	constructor() {
		super('Scene5');
	}

	preload() {
		// match Boot/Scene4 asset loading path
		this.load.image('scene_5', 'src/gameassets/scene_5.png');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_5');
		// Background at depth 0, no interactive - let hitboxes catch clicks
		this.background.setDepth(0);

		// labgowns hitbox from (740,418.5) to (1229,708.5)
		const labgownsX = (740 + 1229) / 2; // 984.5
		const labgownsY = (418.5 + 708.5) / 2; // 563.5
		const labgownsWidth = 1229 - 740; // 489
		const labgownsHeight = 708.5 - 418.5; // 290

		this.labgowns = this.add.rectangle(labgownsX, labgownsY, labgownsWidth, labgownsHeight, 0x000000, 0.001);
		this.labgowns.setStrokeStyle(2, 0x0000ff, 0.75);
		this.labgowns.setDepth(10);
		this.labgowns.setInteractive({ useHandCursor: true });
		this.labgowns.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene5] labgowns clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.lineGraphics.lineStyle(2, 0x000000);
			this.lineGraphics.lineBetween(808, 114.5, 889, 114.5);
			this.labgownsCheck.setVisible(true);
			this.labgownsHitboxCheck.setVisible(true);
			this.clickedState.labgowns = true;
			this.checkAllClicked();
		});

		// faceMask hitbox from (366,544) to (716,624.5)
		const faceMaskX = (366 + 716) / 2; // 541
		const faceMaskY = (544 + 624.5) / 2; // 584.25
		const faceMaskWidth = 716 - 366; // 350
		const faceMaskHeight = 624.5 - 544; // 80.5

		this.faceMask = this.add.rectangle(faceMaskX, faceMaskY, faceMaskWidth, faceMaskHeight, 0x000000, 0.001);
		this.faceMask.setStrokeStyle(2, 0x0000ff, 0.75);
		this.faceMask.setDepth(10);
		this.faceMask.setInteractive({ useHandCursor: true });
		this.faceMask.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene5] faceMask clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.lineGraphics.lineStyle(2, 0x000000);
			this.lineGraphics.lineBetween(808, 134.5, 903, 134.5);
			this.faceMaskCheck.setVisible(true);
			this.faceMaskHitboxCheck.setVisible(true);
			this.clickedState.faceMask = true;
			this.checkAllClicked();
		});

		// gloves hitbox from (54,473.5) to (233,567.5)
		const glovesX = (54 + 233) / 2; // 143.5
		const glovesY = (473.5 + 567.5) / 2; // 520.5
		const glovesWidth = 233 - 54; // 179
		const glovesHeight = 567.5 - 473.5; // 94

		this.gloves = this.add.rectangle(glovesX, glovesY, glovesWidth, glovesHeight, 0x000000, 0.001);
		this.gloves.setStrokeStyle(2, 0x0000ff, 0.75);
		this.gloves.setDepth(10);
		this.gloves.setInteractive({ useHandCursor: true });
		this.gloves.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene5] gloves clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.lineGraphics.lineStyle(2, 0x000000);
			this.lineGraphics.lineBetween(808, 175.5, 972, 175.5);
			this.glovesCheck.setVisible(true);
			this.glovesHitboxCheck.setVisible(true);
			this.clickedState.gloves = true;
			this.checkAllClicked();
		});

		// faceShield hitbox from (43,195.5) to (239,346)
		const faceShieldX = (43 + 239) / 2; // 141
		const faceShieldY = (195.5 + 346) / 2; // 270.75
		const faceShieldWidth = 239 - 43; // 196
		const faceShieldHeight = 346 - 195.5; // 150.5

		this.faceShield = this.add.rectangle(faceShieldX, faceShieldY, faceShieldWidth, faceShieldHeight, 0x000000, 0.001);
		this.faceShield.setStrokeStyle(2, 0x0000ff, 0.75);
		this.faceShield.setDepth(10);
		this.faceShield.setInteractive({ useHandCursor: true });
		this.faceShield.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene5] faceShield clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.lineGraphics.lineStyle(2, 0x000000);
			this.lineGraphics.lineBetween(808, 154.5, 909, 154.5);
			this.faceShieldCheck.setVisible(true);
			this.faceShieldHitboxCheck.setVisible(true);
			this.clickedState.faceShield = true;
			this.checkAllClicked();
		});

		// Initialize graphics for drawing lines
		this.lineGraphics = this.add.graphics();
		this.lineGraphics.setDepth(20);

		// Create checkmarks near lines (initially hidden)
		const checkStyle = { fontSize: '24px', color: '#00aa00', fontStyle: 'bold' };
		this.labgownsCheck = this.add.text(780, 102, '✓', checkStyle).setDepth(25).setVisible(false);
		this.faceMaskCheck = this.add.text(780, 122, '✓', checkStyle).setDepth(25).setVisible(false);
		this.faceShieldCheck = this.add.text(780, 142, '✓', checkStyle).setDepth(25).setVisible(false);
		this.glovesCheck = this.add.text(780, 163, '✓', checkStyle).setDepth(25).setVisible(false);

		// Create checkmarks on hitboxes (initially hidden)
		const hitboxCheckStyle = { fontSize: '48px', color: '#00ff00', fontStyle: 'bold' };
		this.labgownsHitboxCheck = this.add.text(labgownsX, labgownsY, '✓', hitboxCheckStyle).setOrigin(0.5).setDepth(25).setVisible(false);
		this.faceMaskHitboxCheck = this.add.text(faceMaskX, faceMaskY, '✓', hitboxCheckStyle).setOrigin(0.5).setDepth(25).setVisible(false);
		this.glovesHitboxCheck = this.add.text(glovesX, glovesY, '✓', hitboxCheckStyle).setOrigin(0.5).setDepth(25).setVisible(false);
		this.faceShieldHitboxCheck = this.add.text(faceShieldX, faceShieldY, '✓', hitboxCheckStyle).setOrigin(0.5).setDepth(25).setVisible(false);

		// Create Next button (initially hidden)
		this.nextButton = this.add.text(1500, 850, 'Next ➜', {
			fontSize: '32px',
			color: '#ffffff',
			backgroundColor: '#007700',
			padding: { x: 20, y: 10 }
		});
		this.nextButton.setOrigin(1, 1);
		this.nextButton.setDepth(30);
		this.nextButton.setInteractive({ useHandCursor: true });
		this.nextButton.setVisible(false);
		this.nextButton.on('pointerover', () => this.nextButton.setStyle({ backgroundColor: '#00aa00' }));
		this.nextButton.on('pointerout', () => this.nextButton.setStyle({ backgroundColor: '#007700' }));
		this.nextButton.on('pointerdown', () => {
			console.log('[Scene5] Next button clicked, going to Scene6');
			this.scene.start('Scene6');
		});
	}

	checkAllClicked() {
		const allClicked = this.clickedState.labgowns &&
			this.clickedState.faceMask &&
			this.clickedState.gloves &&
			this.clickedState.faceShield;

		if (allClicked) {
			this.nextButton.setVisible(true);
		}
	}
}
