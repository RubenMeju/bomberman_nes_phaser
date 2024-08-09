import { Player } from "../objects/Player.js";
import { Bomba } from "../objects/Bomba.js";
import { Bloque } from "../objects/Bloque.js";
import { Enemy } from "../objects/Enemy.js";
import { createAnimations } from "../animations.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.maxBombas = 3;
    this.maxEnemies = 3;
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

    // Crear grupo de bombas
    this.bombas = this.physics.add.group({
      classType: Bomba,
      maxSize: this.maxBombas,
      runChildUpdate: true,
    });

    // Crear grupo de enemigos
    this.enemies = this.physics.add.group({
      classType: Enemy,
      maxSize: this.maxEnemies,
      runChildUpdate: true,
    });

    // Añadir colisión entre enemigos y bloques
    this.physics.add.collider(
      this.enemies,
      this.bloques.solidos,
      this.handleEnemyBlockCollision,
      null,
      this
    );

    // Añadir colisión entre bombas y enemigos
    this.physics.add.collider(
      this.enemies,
      this.bombas,
      this.handleEnemyBlockCollision,
      null,
      this
    );

    // Configurar los controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    createAnimations(this);

    // Crear enemigos iniciales (Ejemplo)
    this.createInitialEnemies();
  }

  update() {
    this.jugador.update(this.cursors);

    // Actualizar todos los enemigos en el grupo
    this.enemies.children.each((enemy) => enemy.update(), this);

    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      if (this.bombas.getTotalUsed() < this.maxBombas) {
        const bomba = this.bombas.get(this.jugador.x, this.jugador.y, "player");

        if (bomba) {
          bomba.body.setImmovable(true);

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

  createInitialEnemies() {
    for (let i = 0; i < this.maxEnemies; i++) {
      // Obtén una posición aleatoria válida para colocar el enemigo
      const position = this.getRandomPosition();

      if (position) {
        const enemy = this.enemies.get(position.x, position.y, "player");

        if (enemy) {
          enemy.setOrigin(0, 0);
          enemy.setActive(true).setVisible(true);
          enemy.setCollideWorldBounds(true); // El jugador no puede salir del mundo
          enemy.anims.play("right_enemy1");
        }
      }
    }
  }

  getRandomPosition() {
    const validPositions = [];
    const layer = this.mapa.getLayer("solidos"); // Cambia 'solidos' por el nombre de la capa adecuada
    const tiles = layer.tilemapLayer.getTilesWithin(
      0,
      0,
      layer.tilemapLayer.width,
      layer.tilemapLayer.height
    );

    tiles.forEach((tile) => {
      if (!tile.properties.suelo) {
        validPositions.push({
          x: tile.pixelX,
          y: tile.pixelY,
        });
      }
    });

    if (validPositions.length === 0) return null;
    const randomIndex = Phaser.Math.Between(0, validPositions.length - 1);
    return validPositions[randomIndex];
  }
}
