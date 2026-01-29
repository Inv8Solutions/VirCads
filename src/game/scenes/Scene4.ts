import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class Scene4 extends Scene
{
    background!: GameObjects.Image;
    hiddenHitbox!: GameObjects.Rectangle;
    hiddenHitbox2!: GameObjects.Rectangle;
    consentCert!: GameObjects.Image;
    blurOverlay!: GameObjects.Rectangle;

    constructor ()
    {
        super('Scene4');
    }

    create ()
    {
        this.background = this.add.image(800, 450, 'scene_4');
        
        // Hidden hitbox 1 (big) - same coordinates as other scenes
        const hitboxX = (822 + 1536) / 2; // center X = 1179
        const hitboxY = (34.5 + 874.5) / 2; // center Y = 454.5
        const hitboxWidth = 1536 - 822; // width = 714
        const hitboxHeight = 874.5 - 34.5; // height = 840

        this.hiddenHitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        this.hiddenHitbox.setInteractive({ useHandCursor: true });
        this.hiddenHitbox.setAlpha(0.001);
        this.hiddenHitbox.setDepth(10);
        this.hiddenHitbox.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene4] Hidden hitbox 1 clicked at x: ${pointer.x}, y: ${pointer.y}`);
            this.showConsentCert();
        });

        // Hidden hitbox 2 (small) - bottom-left area
        const hitbox2X = (73 + 748) / 2; // center X = 410.5
        const hitbox2Y = (792.5 + 840.5) / 2; // center Y = 816.5
        const hitbox2Width = 748 - 73; // width = 675
        const hitbox2Height = 840.5 - 792.5; // height = 48

        this.hiddenHitbox2 = this.add.rectangle(hitbox2X, hitbox2Y, hitbox2Width, hitbox2Height);
        this.hiddenHitbox2.setInteractive({ useHandCursor: true });
        this.hiddenHitbox2.setAlpha(0.001);
        this.hiddenHitbox2.setDepth(10);
        this.hiddenHitbox2.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene4] Hidden hitbox 2 clicked at x: ${pointer.x}, y: ${pointer.y}`);
        });

        // Background debug (lower depth)
        this.background.setInteractive();
        this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`[Scene4] Background click at x: ${pointer.x}, y: ${pointer.y}`);
        });

        EventBus.emit('current-scene-ready', this);
    }

    showConsentCert ()
    {
        if (!this.blurOverlay) {
            this.blurOverlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7);
            this.blurOverlay.setDepth(99);
            this.blurOverlay.setInteractive();
        } else {
            this.blurOverlay.setVisible(true);
        }

        if (!this.consentCert) {
            this.consentCert = this.add.image(800, 450, 'consent_cert');
            this.consentCert.setDepth(100);
            this.consentCert.setInteractive();
            this.consentCert.on('pointerdown', () => {
                this.consentCert.setVisible(false);
                this.blurOverlay.setVisible(false);
            });
        } else {
            this.consentCert.setVisible(true);
        }
    }
}
