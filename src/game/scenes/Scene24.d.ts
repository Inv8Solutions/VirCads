import { GameObjects, Scene } from 'phaser';
export declare class Scene24 extends Scene {
    graphics: Phaser.GameObjects.Graphics;
    startPoint: {
        x: number;
        y: number;
    } | null;
    measuring: boolean;
    infoText: GameObjects.Text;
    instructionText: GameObjects.Text;
    constructor();
    create(): void;
}
