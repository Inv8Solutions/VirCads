import { GameObjects, Scene } from 'phaser';
export declare class Scene10 extends Scene {
    background: GameObjects.Image;
    radioButtons: {
        [key: string]: GameObjects.Shape;
    };
    selectedRadio: string | null;
    submitButton: GameObjects.Text;
    tooltip: GameObjects.Image;
    blurOverlay: GameObjects.Rectangle;
    nextButton: GameObjects.Text;
    constructor();
    create(): void;
    createRadioButton(letter: string, x: number, y: number): void;
    selectRadio(letter: string): void;
    handleSubmit(): void;
}
