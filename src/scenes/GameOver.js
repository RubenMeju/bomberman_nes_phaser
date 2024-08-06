export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  create() {
    this.add.text(200, 250, "Game Over\nPress Space to Restart", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.input.keyboard.on("keydown-SPACE", () => {
      this.scene.start("StartGame");
    });
  }
}
