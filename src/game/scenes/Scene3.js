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
var Scene3 = /** @class */ (function (_super) {
    __extends(Scene3, _super);
    function Scene3() {
        return _super.call(this, 'Scene3') || this;
    }
    Scene3.prototype.create = function () {
        var _this = this;
        this.background = this.add.image(800, 450, 'scene_3');
        // Hidden hitbox 1 based on coordinates:
        // Top left: (822, 34.5), Top right: (1536, 36.5)
        // Bottom left: (821, 874.5), Bottom right: (1536, 871.5)
        var hitboxX = (822 + 1536) / 2; // center X = 1179
        var hitboxY = (34.5 + 874.5) / 2; // center Y = 454.5
        var hitboxWidth = 1536 - 822; // width = 714
        var hitboxHeight = 874.5 - 34.5; // height = 840
        this.hiddenHitbox = this.add.rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        this.hiddenHitbox.setInteractive({ useHandCursor: true });
        this.hiddenHitbox.setAlpha(0.001); // Nearly invisible but still interactive
        this.hiddenHitbox.setDepth(10); // Above background
        this.hiddenHitbox.on('pointerdown', function (pointer) {
            console.log("[Scene3] Hidden hitbox 1 clicked at x: ".concat(pointer.x, ", y: ").concat(pointer.y));
            _this.showReqForm();
        });
        // Hidden hitbox 2 based on coordinates:
        // Top left: (73, 792.5), Bottom right: (748, 840.5)
        var hitbox2X = (73 + 748) / 2; // center X = 410.5
        var hitbox2Y = (792.5 + 840.5) / 2; // center Y = 816.5
        var hitbox2Width = 748 - 73; // width = 675
        var hitbox2Height = 840.5 - 792.5; // height = 48
        this.hiddenHitbox2 = this.add.rectangle(hitbox2X, hitbox2Y, hitbox2Width, hitbox2Height);
        this.hiddenHitbox2.setInteractive({ useHandCursor: true });
        this.hiddenHitbox2.setAlpha(0.001); // Nearly invisible but still interactive
        this.hiddenHitbox2.setDepth(10); // Above background
        this.hiddenHitbox2.on('pointerdown', function (pointer) {
            console.log("[Scene3] Hidden hitbox 2 clicked at x: ".concat(pointer.x, ", y: ").concat(pointer.y));
            _this.scene.start('Scene4');
        });
        // Debug: log click coordinates on background (lower depth)
        this.background.setInteractive();
        this.background.on('pointerdown', function (pointer) {
            console.log("[Scene3] Background click at x: ".concat(pointer.x, ", y: ").concat(pointer.y));
        });
        EventBus.emit('current-scene-ready', this);
    };
    Scene3.prototype.showReqForm = function () {
        var _this = this;
        // Show blur overlay behind the req form
        if (!this.blurOverlay) {
            this.blurOverlay = this.add.rectangle(800, 450, 1600, 900, 0x000000, 0.7);
            this.blurOverlay.setDepth(99);
            this.blurOverlay.setInteractive(); // Block clicks to elements behind
        }
        else {
            this.blurOverlay.setVisible(true);
        }
        // Show req_form.png in the middle of the screen
        if (!this.reqForm) {
            this.reqForm = this.add.image(800, 450, 'spot_report');
            this.reqForm.setDepth(100);
            // Make it clickable to hide it
            this.reqForm.setInteractive();
            this.reqForm.on('pointerdown', function () {
                _this.reqForm.setVisible(false);
                _this.blurOverlay.setVisible(false);
            });
        }
        else {
            this.reqForm.setVisible(true);
        }
    };
    return Scene3;
}(Scene));
export { Scene3 };
