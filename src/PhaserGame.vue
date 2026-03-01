<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from './game/EventBus';
import StartGame from './game/main';
import Phaser from 'phaser';

// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene']);

const onSceneReady = (scene_instance: Phaser.Scene) => {
    emit('current-active-scene', scene_instance);
    scene.value = scene_instance;
};

onMounted(() => {
    game.value = StartGame('game-container');
    EventBus.on('current-scene-ready', onSceneReady);
});

onUnmounted(() => {
    EventBus.off('current-scene-ready', onSceneReady);

    if (game.value) {
        game.value.destroy(true);
        game.value = null;
    }
});

defineExpose({ scene, game });

</script>

<template>
    <div id="game-container"></div>
</template>