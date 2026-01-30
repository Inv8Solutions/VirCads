import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene10 extends Scene {
	background!: GameObjects.Image;
	radioButtons: { [key: string]: GameObjects.Shape } = {};
	selectedRadio: string | null = null;
	submitButton!: GameObjects.Text;
	tooltip!: GameObjects.Image;
	blurOverlay!: GameObjects.Rectangle;
	nextButton!: GameObjects.Text;

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

		// Submit button on bottom right
		this.submitButton = this.add.text(1500, 850, 'Submit', {
			fontSize: '32px',
			color: '#ffffff',
			backgroundColor: '#007700',
			padding: { x: 20, y: 10 }
		});
		this.submitButton.setOrigin(1, 1);
		this.submitButton.setDepth(30);
		this.submitButton.setInteractive({ useHandCursor: true });
		this.submitButton.on('pointerover', () => this.submitButton.setStyle({ backgroundColor: '#00aa00' }));
		this.submitButton.on('pointerout', () => this.submitButton.setStyle({ backgroundColor: '#007700' }));
		this.submitButton.on('pointerdown', () => {
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

			// Create/show Next button - make sure it stays visible and clickable
			if (!this.nextButton) {
				this.nextButton = this.add.text(1400, 850, 'Next ➜', {
					fontSize: '32px',
					color: '#ffffff',
					backgroundColor: '#0066cc',
					padding: { x: 20, y: 10 }
				});
				this.nextButton.setOrigin(1, 1);
				this.nextButton.setDepth(102); // Higher than tooltip to ensure it's clickable
				this.nextButton.setInteractive({ useHandCursor: true });
				this.nextButton.on('pointerover', () => this.nextButton.setStyle({ backgroundColor: '#0088ff' }));
				this.nextButton.on('pointerout', () => this.nextButton.setStyle({ backgroundColor: '#0066cc' }));
				this.nextButton.on('pointerdown', () => {
					console.log('[Scene10] Next button clicked, going to Scene11');
					this.scene.start('Scene11');
				});
				this.nextButton.setVisible(true);
			} else {
				this.nextButton.setVisible(true);
			}
		} else {
			console.log(`[Scene10] No answer selected`);
		}
	}
}
