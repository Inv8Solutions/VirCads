<script setup lang="ts">
import { ref } from 'vue';
import PhaserGame from './PhaserGame.vue';
import type Phaser from 'phaser';

const phaserRef = ref<InstanceType<typeof PhaserGame>>();
const currentSceneName = ref('');
const scenes = ref<string[]>([]);

// Event emitted from the PhaserGame component
const currentScene = (scene: Phaser.Scene) => {
    currentSceneName.value = scene.scene.key;
    
    // Dynamically get all registered scene keys from the game (refresh each time)
    const game = phaserRef.value?.game;
    if (game) {
        scenes.value = game.scene.scenes.map((s: Phaser.Scene) => s.scene.key);
    }
}

const switchScene = (sceneName: string) => {
    const game = phaserRef.value?.game;
    if (game) {
        console.log(`[DEV] Switching to ${sceneName}`);
        // Stop all running scenes first, then start the target scene
        game.scene.scenes.forEach((s: Phaser.Scene) => {
            if (s.scene.isActive()) {
                game.scene.stop(s.scene.key);
            }
        });
        game.scene.start(sceneName);
    }
}
</script>

<template>
    <div class="app-container">
        <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
        
        <!-- Dev Controls Panel -->
        <div class="dev-controls">
            <div class="dev-title">DEV CONTROLS</div>
            <div class="dev-current">Current: {{ currentSceneName }}</div>
            <div class="dev-buttons">
                <button
                    v-for="scene in scenes"
                    :key="scene"
                    :class="{ active: currentSceneName === scene }"
                    @click="switchScene(scene)"
                >
                    {{ scene }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    position: relative;
}

.dev-controls {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.85);
    border: 1px solid #444;
    border-radius: 8px;
    padding: 12px;
    z-index: 9999;
    font-family: monospace;
    min-width: 140px;
    max-height: 80vh;
    overflow: auto;
}

.dev-title {
    color: #ffff00;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 8px;
    text-align: center;
}

.dev-current {
    color: #00ffff;
    font-size: 11px;
    margin-bottom: 10px;
    text-align: center;
}

.dev-buttons {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: calc(80vh - 120px);
    overflow-y: auto;
}

.dev-buttons button {
    background: #333;
    color: #fff;
    border: 1px solid #555;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.15s;
    font-family: monospace;
}

.dev-buttons button:hover {
    background: #555;
}

.dev-buttons button.active {
    background: #006600;
    color: #00ff00;
    border-color: #00aa00;
}
</style>
