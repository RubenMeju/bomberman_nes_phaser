import { Player } from "../objects/Player.js";
import { Bomba } from "../objects/Bomba.js";
import { Bloque } from "../objects/Bloque.js";

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

    // Crear animaciones
    this.createAnimations();
  }

  createAnimations() {
    this.anims.create({
      key: "bomba",
      frames: this.anims.generateFrameNumbers("player", { start: 42, end: 44 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "explosion_center",
      frames: [{ key: "player", frame: 86 }],
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion_right",
      frames: [{ key: "player", frame: 85 }],
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion_left",
      frames: [{ key: "player", frame: 87 }],
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion_up",
      frames: [{ key: "player", frame: 72 }],
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion_down",
      frames: [{ key: "player", frame: 100 }],
      frameRate: 10,
      repeat: 0,
    });

    //destruir bloque
    this.anims.create({
      key: "destruction",
      frames: this.anims.generateFrameNumbers("player", { start: 47, end: 52 }),
      frameRate: 18,
      repeat: 0,
    });
  }

  update() {
    this.jugador.update(this.cursors);

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
}
