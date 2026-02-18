import { GameObjects, Scene } from 'phaser';
export declare class Scene5 extends Scene {
    background: GameObjects.Image;
    labgowns: GameObjects.Rectangle;
    faceMask: GameObjects.Rectangle;
    gloves: GameObjects.Rectangle;
    faceShield: GameObjects.Rectangle;
    lineGraphics: GameObjects.Graphics;
    labgownsCheck: GameObjects.Text;
    faceMaskCheck: GameObjects.Text;
    glovesCheck: GameObjects.Text;
    faceShieldCheck: GameObjects.Text;
    labgownsHitboxCheck: GameObjects.Text;
    faceMaskHitboxCheck: GameObjects.Text;
    glovesHitboxCheck: GameObjects.Text;
    faceShieldHitboxCheck: GameObjects.Text;
    nextButton: GameObjects.Text;
    clickedState: {
        labgowns: boolean;
        faceMask: boolean;
        gloves: boolean;
        faceShield: boolean;
    };
    constructor();
    preload(): void;
    create(): void;
    checkAllClicked(): void;
}
