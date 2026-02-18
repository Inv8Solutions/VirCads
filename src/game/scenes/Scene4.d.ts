import { GameObjects, Scene } from 'phaser';
export declare class Scene4 extends Scene {
    background: GameObjects.Image;
    hiddenHitbox: GameObjects.Rectangle;
    hiddenHitbox2: GameObjects.Rectangle;
    consentCert: GameObjects.Image;
    blurOverlay: GameObjects.Rectangle;
    constructor();
    create(): void;
    showConsentCert(): void;
}
