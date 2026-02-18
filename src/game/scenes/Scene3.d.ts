import { GameObjects, Scene } from 'phaser';
export declare class Scene3 extends Scene {
    background: GameObjects.Image;
    hiddenHitbox: GameObjects.Rectangle;
    hiddenHitbox2: GameObjects.Rectangle;
    reqForm: GameObjects.Image;
    blurOverlay: GameObjects.Rectangle;
    constructor();
    create(): void;
    showReqForm(): void;
}
