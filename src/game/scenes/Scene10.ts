import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene10 extends Scene {
	background!: GameObjects.Image;
	radioButtons: { [key: string]: GameObjects.Shape } = {};
	selectedRadio: string | null = null;
	submitBg!: GameObjects.Rectangle;
	submitText!: GameObjects.Text;
	tooltip!: GameObjects.Image;
	blurOverlay!: GameObjects.Rectangle;
	nextButtonBg!: GameObjects.Rectangle;
	nextButtonText!: GameObjects.Text;

	constructor() {
		super('Scene10');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_10');
		this.background.setDisplaySize(1600, 900);
		this.background.setDepth(0);

		// Create radio buttons
		this.createRadioButton('A', 628, 756);
		this.createRadioButton('B', 628, 781);
		this.createRadioButton('C', 628, 806);
		this.createRadioButton('D', 628, 832);

		// Submit button on bottom right (white bg, black text, black border)
		const sX = 1500;
		const sY = 850;
		const tmp = this.add.text(0, 0, 'Submit', { fontSize: '32px', color: '#000000' }).setOrigin(0.5, 0.5).setDepth(31);
		const sw = tmp.width;
		const sh = tmp.height;
		this.submitBg = this.add.rectangle(sX, sY, sw + 40, sh + 20, 0xffffff).setOrigin(1, 1).setStrokeStyle(2, 0x000000).setDepth(30);
		this.submitText = tmp.setPosition(sX - (sw + 40) / 2, sY - (sh + 20) / 2).setDepth(31);
		this.submitBg.setInteractive({ useHandCursor: true });
		this.submitBg.on('pointerover', () => this.submitBg.setFillStyle(0xf6f6f6));
		this.submitBg.on('pointerout', () => this.submitBg.setFillStyle(0xffffff));
		this.submitBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene10] Submit clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.handleSubmit();
		});

		EventBus.emit('current-scene-ready', this);
	}

	createRadioButton(letter: string, x: number, y: number) {
		const radio = this.add.circle(x, y, 8, 0xffffff);
		radio.setStrokeStyle(2, 0x000000);
		radio.setDepth(10);
		radio.setInteractive({ useHandCursor: true });
		
		radio.on('pointerdown', () => {
			this.selectRadio(letter);
		});

		// Store reference to radio button
		this.radioButtons[letter] = radio;
	}

	selectRadio(letter: string) {
		// Clear all radio buttons
		Object.values(this.radioButtons).forEach(radio => {
			radio.setFillStyle(0xffffff);
		});

		// Fill selected radio button
		const selectedRadio = this.radioButtons[letter];
		if (selectedRadio) {
			selectedRadio.setFillStyle(0x000000);
			this.selectedRadio = letter;
			console.log(`[Scene10] Radio ${letter} selected`);
		}
	}

	handleSubmit() {
		if (this.selectedRadio) {
			console.log(`[Scene10] Submitted answer: ${this.selectedRadio}`);
			
			// Create blur overlay - don't make it interactive so it doesn't block clicks
			if (!this.blurOverlay) {
				this.blurOverlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7);
				this.blurOverlay.setDepth(99);
				// Remove setInteractive() to allow clicks through to higher depth objects
			} else {
				this.blurOverlay.setVisible(true);
			}

			// Show correct or wrong tooltip based on answer
			const tooltipKey = this.selectedRadio === 'C' ? 'correct_tooltip' : 'wrong_tooltip';
			
			if (!this.tooltip) {
				this.tooltip = this.add.image(800, 450, tooltipKey);
				this.tooltip.setDepth(100);
				this.tooltip.setInteractive();
				this.tooltip.on('pointerdown', () => {
					this.tooltip.setVisible(false);
					this.blurOverlay.setVisible(false);
					// Keep Next button visible after closing tooltip
				});
			} else {
				this.tooltip.setTexture(tooltipKey);
				this.tooltip.setVisible(true);
			}

			// Create/show Next button - white bg, black text, black border
			if (!this.nextButtonBg) {
				const nX = 1400;
				const nY = 850;
				const ntmp = this.add.text(0, 0, 'Next ➜', { fontSize: '32px', color: '#000000' }).setOrigin(0.5, 0.5).setDepth(103);
				const nw = ntmp.width;
				const nh = ntmp.height;
				this.nextButtonBg = this.add.rectangle(nX, nY, nw + 40, nh + 20, 0xffffff).setOrigin(1, 1).setStrokeStyle(2, 0x000000).setDepth(102);
				this.nextButtonText = ntmp.setPosition(nX - (nw + 40) / 2, nY - (nh + 20) / 2).setDepth(103);
				this.nextButtonBg.setInteractive({ useHandCursor: true });
				this.nextButtonBg.on('pointerover', () => this.nextButtonBg.setFillStyle(0xf6f6f6));
				this.nextButtonBg.on('pointerout', () => this.nextButtonBg.setFillStyle(0xffffff));
				this.nextButtonBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
					console.log(`[Scene10] Next clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY}) -> Scene11`);
					this.scene.start('Scene11');
				});
				this.nextButtonBg.setVisible(true);
				this.nextButtonText.setVisible(true);
			} else {
				this.nextButtonBg.setVisible(true);
				this.nextButtonText.setVisible(true);
			}
		} else {
			console.log(`[Scene10] No answer selected`);
		}
	}
}
