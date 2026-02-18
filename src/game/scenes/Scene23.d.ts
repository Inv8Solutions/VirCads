import { GameObjects, Scene } from 'phaser';
export declare class Scene23 extends Scene {
    background: GameObjects.Image;
    textBox: GameObjects.Text;
    flashOverlay: GameObjects.Rectangle;
    graphics: Phaser.GameObjects.Graphics;
    measuring: boolean;
    rulerStart: {
        x: number;
        y: number;
    } | null;
    rulerOverlay?: Phaser.GameObjects.Rectangle;
    rulerInfo?: GameObjects.Text;
    rulerInstruction?: GameObjects.Text;
    rulerBack?: GameObjects.Text;
    PIXELS_PER_CM: number;
    continueBtn?: GameObjects.Text;
    constructor();
    create(): void;
}
