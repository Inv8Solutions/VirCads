import { Scene } from 'phaser';
export declare class Scene25 extends Scene {
    skinChecks: Record<string, Phaser.GameObjects.Text | null>;
    skinTonesSelected: string | null;
    hairChecks: Record<string, Phaser.GameObjects.Text | null>;
    hairColorSelected: string | null;
    featureChecks: Record<string, Phaser.GameObjects.Text | null>;
    constructor();
    create(): void;
}
