import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene10 extends Scene {
	background!: GameObjects.Image;
	radioButtons: { [key: string]: GameObjects.Shape } = {};
	selectedRadio: string | null = null;
	submitBg!: GameObjects.Rectangle;
	submitText!: GameObjects.Text;
	feedbackBg!: GameObjects.Rectangle;
	feedbackText!: GameObjects.Text;
	nextButtonBg!: GameObjects.Rectangle;
	nextButtonText!: GameObjects.Text;

	constructor() {
		super('Scene10');
	}

	create() {
		this.background = this.add.image(800, 450, 'scene_9');
		this.background.setDisplaySize(1600, 900);
		this.background.setDepth(0);

		// Quiz question and options
		const quizX = 800;
		const quizY = 640;
		const quizW = 980;
		const quizH = 225;
		const quizBg = this.add.rectangle(quizX, quizY + 42.5, quizW, quizH, 0x000000, 0.9).setDepth(10);
		quizBg.setStrokeStyle(2, 0xffffff, 1);
		this.add.text(quizX, quizY, 'Which vantage point should be captured first when documenting a body?', {
			fontSize: '22px',
			color: '#ffffff',
			fontFamily: 'Arial',
			align: 'center',
			wordWrap: { width: quizW }
		}).setOrigin(0.5).setDepth(12);

		const optionX = 680;
		const optionStartY = 675;
		const optionGap = 28;
		const optionTextStyle = { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial' } as const;
		const options = [
			{ key: 'A', text: 'a. Mid-range Shot' },
			{ key: 'B', text: 'b. Close-up Shot' },
			{ key: 'C', text: 'c. Overall Shot' },
			{ key: 'D', text: 'd. Extreme Close-up Shot' }
		];

		options.forEach((opt, i) => {
			const y = optionStartY + i * optionGap;
			this.createRadioButton(opt.key, optionX - 26, y + 6);
			this.add.text(optionX, y, opt.text, optionTextStyle).setOrigin(0, 0.5).setDepth(12);
		});

		// Submit button on bottom right (black bg, white text, white border)
		const sX = 1500;
		const sY = 850;
		const tmp = this.add.text(0, 0, 'Submit', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(31);
		const sw = tmp.width;
		const sh = tmp.height;
		this.submitBg = this.add.rectangle(sX, sY, sw + 40, sh + 20, 0x000000).setOrigin(1, 1).setStrokeStyle(2, 0xffffff).setDepth(30);
		this.submitText = tmp.setPosition(sX - (sw + 40) / 2, sY - (sh + 20) / 2).setDepth(31);
		this.submitBg.setInteractive({ useHandCursor: true });
		this.submitBg.on('pointerover', () => this.submitBg.setFillStyle(0x111111));
		this.submitBg.on('pointerout', () => this.submitBg.setFillStyle(0x000000));
		this.submitBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			console.log(`[Scene10] Submit clicked screen=(${pointer.x},${pointer.y}) world=(${pointer.worldX},${pointer.worldY})`);
			this.handleSubmit();
		});

		EventBus.emit('current-scene-ready', this);
	}

	createRadioButton(letter: string, x: number, y: number) {
		const radio = this.add.circle(x, y, 8, 0x000000);
		radio.setStrokeStyle(2, 0xffffff);
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
			radio.setFillStyle(0x000000);
		});

		// Fill selected radio button
		const selectedRadio = this.radioButtons[letter];
		if (selectedRadio) {
			selectedRadio.setFillStyle(0xffffff);
			this.selectedRadio = letter;
			console.log(`[Scene10] Radio ${letter} selected`);
		}
	}

	handleSubmit() {
		if (this.selectedRadio) {
			console.log(`[Scene10] Submitted answer: ${this.selectedRadio}`);
			
			// Show small feedback tooltip
			const isCorrect = this.selectedRadio === 'C';
			const feedbackText = isCorrect ? 'Correct!' : 'Incorrect. Correct answer: Overall Shot.';
			if (!this.feedbackBg) {
				const fbW = 520;
				const fbH = 54;
				this.feedbackBg = this.add.rectangle(800, 600, fbW, fbH, 0x000000, 0.9).setDepth(100);
				this.feedbackBg.setStrokeStyle(2, 0xffffff, 1);
				this.feedbackText = this.add.text(800, 600, feedbackText, {
					fontSize: '18px',
					color: '#ffffff',
					fontFamily: 'Arial',
					align: 'center',
					wordWrap: { width: fbW - 20 }
				}).setOrigin(0.5).setDepth(101);
			} else {
				this.feedbackBg.setVisible(true);
				this.feedbackText.setVisible(true);
				this.feedbackText.setText(feedbackText);
			}

			// Create/show Next button - black bg, white text, white border
			if (!this.nextButtonBg) {
				const nX = 1400;
				const nY = 850;
				const ntmp = this.add.text(0, 0, 'Next ➜', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(103);
				const nw = ntmp.width;
				const nh = ntmp.height;
				this.nextButtonBg = this.add.rectangle(nX, nY, nw + 40, nh + 20, 0x000000).setOrigin(1, 1).setStrokeStyle(2, 0xffffff).setDepth(102);
				this.nextButtonText = ntmp.setPosition(nX - (nw + 40) / 2, nY - (nh + 20) / 2).setDepth(103);
				this.nextButtonBg.setInteractive({ useHandCursor: true });
				this.nextButtonBg.on('pointerover', () => this.nextButtonBg.setFillStyle(0x111111));
				this.nextButtonBg.on('pointerout', () => this.nextButtonBg.setFillStyle(0x000000));
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
