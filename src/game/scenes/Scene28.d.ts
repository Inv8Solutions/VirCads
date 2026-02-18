import { Scene } from 'phaser';
export declare class Scene28 extends Scene {
    selectedOption: string | null;
    optionRects: Record<string, Phaser.GameObjects.Rectangle>;
    constructor();
    create(): void;
    selectOption(key: string): void;
}
