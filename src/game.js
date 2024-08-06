import { StartGame } from "./scenes/StartGame.js";
import { GameScene } from "./scenes/GameScene.js";
import { GameOver } from "./scenes/GameOver.js";

const config = {
  type: Phaser.AUTO,
  width: 25 * 32,
  height: 13 * 32,
  scene: [StartGame, GameScene, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
