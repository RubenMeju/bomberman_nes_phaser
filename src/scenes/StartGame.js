export class StartGame extends Phaser.Scene {
  constructor() {
    super({ key: "StartGame" });
  }

  preload() {
    // Load any assets needed for the start screen
  }

  create() {
    this.add.text(200, 250, "Press Space to Start", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.input.keyboard.on("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }
}
