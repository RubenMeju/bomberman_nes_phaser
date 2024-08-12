import { StartGame } from "./scenes/StartGame.js";
import { GameScene } from "./scenes/GameScene.js";
import { GameOver } from "./scenes/GameOver.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [StartGame, GameScene, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: false,
    },
  },
};

const game = new Phaser.Game(config);
