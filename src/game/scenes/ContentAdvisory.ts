import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class ContentAdvisory extends Scene
{
    background!: GameObjects.Image;

    constructor ()
    {
        super('ContentAdvisory');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'content_advisory');
        
        // "Click to continue" label at bottom center
        const contGfx = this.add.graphics().setDepth(10);
        contGfx.fillStyle(0xffffff, 0.85);
        contGfx.fillRoundedRect(700, 848, 200, 34, 10);
        const contText = this.add.text(800, 865, 'Click to continue', { fontSize: '18px', color: '#000000', fontFamily: 'Arial' })
            .setOrigin(0.5)
            .setDepth(11);

        const contHit = this.add.rectangle(800, 865, 200, 34, 0x000000, 0)
            .setOrigin(0.5)
            .setDepth(12)
            .setInteractive({ useHandCursor: true });

        let disclaimerOpen = false;
        const openDisclaimerDialog = () => {
            if (disclaimerOpen) return;
            disclaimerOpen = true;

            const blocker = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.35)
                .setOrigin(0.5)
                .setDepth(50);
            const dialogBg = this.add.rectangle(800, 450, 900, 320, 0x000000, 1)
                .setOrigin(0.5)
                .setDepth(51);
            const dialogText = this.add.text(800, 420,
                'All names in this document are works of fiction and do not represent a real person.\n\nBe warned of flashing lights.',
                {
                    fontSize: '22px',
                    color: '#ffffff',
                    fontFamily: 'Arial',
                    align: 'center',
                    wordWrap: { width: 820 }
                })
                .setOrigin(0.5)
                .setDepth(52);

            const nextBtn = this.add.rectangle(800, 540, 220, 48, 0xffffff, 1)
                .setOrigin(0.5)
                .setDepth(53)
                .setInteractive({ useHandCursor: true });
            const nextText = this.add.text(800, 540, 'Continue', { fontSize: '20px', color: '#000000', fontFamily: 'Arial' })
                .setOrigin(0.5)
                .setDepth(54);

            nextBtn.on('pointerdown', () => {
                blocker.destroy();
                dialogBg.destroy();
                dialogText.destroy();
                nextBtn.destroy();
                nextText.destroy();
                this.changeScene();
            });
        };

        contHit.on('pointerdown', openDisclaimerDialog);
        contText.setInteractive({ useHandCursor: true }).on('pointerdown', openDisclaimerDialog);

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        this.scene.start('IntroText');
    }
}
