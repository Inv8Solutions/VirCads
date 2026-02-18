var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
var Scene24 = /** @class */ (function (_super) {
    __extends(Scene24, _super);
    function Scene24() {
        var _this = _super.call(this, 'Scene24') || this;
        _this.startPoint = null;
        _this.measuring = false;
        return _this;
    }
    Scene24.prototype.create = function () {
        var _this = this;
        // background for the tool (scene_24)
        var bg = this.add.image(800, 450, 'scene_24');
        bg.setDisplaySize(1600, 900);
        bg.setDepth(0);
        // (no clipboard here) clipboard moved to Scene25
        // Click-to-continue dialog at bottom-center (no full-screen dark overlay)
        this.instructionText = this.add.text(800, 820, 'Click to continue', { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5).setDepth(11);
        var dialogBg = this.add.rectangle(800, 820, 400, 64, 0x000000, 0.6).setDepth(10);
        dialogBg.setInteractive({ useHandCursor: true });
        // clicking the dialog proceeds to the next scene
        dialogBg.on('pointerdown', function () {
            _this.scene.start('Scene25');
        });
        EventBus.emit('current-scene-ready', this);
    };
    return Scene24;
}(Scene));
export { Scene24 };
