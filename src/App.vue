<script setup lang="ts">
import type { MainMenu } from './game/scenes/MainMenu';
import PhaserGame from './PhaserGame.vue';

// Event emitted from the PhaserGame component
const currentScene = (_scene: MainMenu) => {
    // Scene change handler
}

</script>

<template>
    <PhaserGame @current-active-scene="currentScene" />
</template>
