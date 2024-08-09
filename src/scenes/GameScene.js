import { Player } from "../objects/Player.js";
import { Bomba } from "../objects/Bomba.js";
import { Bloque } from "../objects/Bloque.js";
import { Enemy } from "../objects/Enemy.js";
import { createAnimations } from "../animations.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.spritesheet("player", "assets/tileSets.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.tilemapTiledJSON("mapa", "/assets/mapa.json");
    this.load.image("tileSets", "assets/tileSets.png");
  }

  create() {
    this.cameras.main.setBackgroundColor("#2e8b00");

    // Crear el mapa
    this.mapa = this.make.tilemap({ key: "mapa" });

    // Instanciar la clase Bloque
    this.bloques = new Bloque(this, this.mapa, "tileSets", "solidos", {
      suelo: true,
    });

    // Crear el jugador
    this.jugador = new Player(this, 0, 0, "player", 0);
    this.physics.add.collider(this.jugador, this.bloques.solidos);

    // Configurar los controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Crear grupo de bombas
    this.bombas = this.physics.add.group({
      classType: Bomba,
      maxSize: this.maxBombas,
      runChildUpdate: true,
    });

    this.maxBombas = 3;

    //ENEMIGOS
    this.enemy = new Enemy(this, 0, 64, "player", 0);
    this.physics.add.collider(
      this.enemy,
      this.bloques.solidos,
      this.handleEnemyBlockCollision,
      null,
      this
    );

    createAnimations(this);
  }

  update() {
    this.jugador.update(this.cursors);

    this.enemy.update();
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      if (this.bombas.getTotalUsed() < this.maxBombas) {
        const bomba = this.bombas.get(this.jugador.x, this.jugador.y, "player");

        if (bomba) {
          bomba.setActive(true).setVisible(true);
          bomba.anims.play("bomba");

          this.time.delayedCall(3000, () => bomba.explode(), [], bomba);
        }
      }
    }
  }

  handleEnemyBlockCollision(enemy, block) {
    // Cambia la dirección del enemigo invirtiendo su velocidad
    enemy.changeDirection();
  }
}
