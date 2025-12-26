# Phaser Assets

This directory contains all the assets for your Phaser game.

## Directory Structure

- `images/` - Static image files (PNG, JPG, etc.)
- `audio/` - Sound effects and music files (MP3, OGG, WAV)
- `spritesheets/` - Sprite sheets and sprite atlas files
- `tilemaps/` - Tilemap data files (JSON) and tileset images
- `fonts/` - Custom font files for Phaser text rendering

## Asset Loading

Assets in this folder are accessible via the `/phaser/assets/` path in your Phaser game.

Example:
```javascript
// In your Phaser scene
this.load.image('player', '/phaser/assets/images/player.png');
this.load.audio('background-music', '/phaser/assets/audio/background.mp3');
```
