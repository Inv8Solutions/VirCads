import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    create() {
      this.add.text(100, 100, "Phaser 2D Game OK", { color: "#fff" });
    }
  }
};

new Phaser.Game(config);