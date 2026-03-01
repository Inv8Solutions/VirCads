import Phaser from 'phaser';

/**
 * Automatically cleans up input listeners, tweens, and timers
 * on scene shutdown/destroy for every scene in the game.
 * Registered as a scene plugin in main.ts — no per-scene code needed.
 *
 * This prevents the most common Phaser memory leaks:
 * - this.input.on('pointerdown/pointermove/pointerup/drag') listeners accumulating
 * - Tweens continuing to run after scene shutdown
 * - this.time.delayedCall callbacks firing after scene is stopped
 */
export class SceneCleanupPlugin extends Phaser.Plugins.ScenePlugin {
    boot() {
        const events = this.systems!.events;
        events.on(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
        events.on(Phaser.Scenes.Events.DESTROY, this.onDestroy, this);
    }

    private onShutdown(): void {
        const scene = this.scene as Phaser.Scene;

        // Remove all scene-level input event listeners
        // (pointerdown, pointermove, pointerup, drag, etc.)
        scene.input.removeAllListeners();

        // Kill all active tweens to prevent callbacks from firing after shutdown
        scene.tweens.killAll();

        // Remove all timer events to prevent delayed callbacks
        scene.time.removeAllEvents();
    }

    private onDestroy(): void {
        const events = this.systems!.events;
        events.off(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
        events.off(Phaser.Scenes.Events.DESTROY, this.onDestroy, this);
    }
}
