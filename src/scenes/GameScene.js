import { Player } from "../objects/Player.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // Cargar el sprite del jugador
    this.load.spritesheet("player", "assets/tileSets.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    // Cargar el archivo JSON del tilemap
    this.load.tilemapTiledJSON("mapa", "/assets/mapa.json");

    // Cargar la imagen del tileset
    this.load.image("tiles", "assets/tileSets.png");
  }

  create() {
    //background color #2e8b00
    this.cameras.main.setBackgroundColor("#2e8b00");

    // Crear el tilemap
    let mapa = this.make.tilemap({ key: "mapa" });

    // Agregar el tileset al mapa
    let tilesets = mapa.addTilesetImage("tileSets", "tiles");

    // Crear la capa dinámica "solidos"
    let solidos = mapa.createLayer("solidos", tilesets, 0, 0).setScale(2);

    // Activar la colisión del tilemap
    solidos.setCollisionByProperty({ suelo: true });

    // Crear el sprite del jugador con la clase Player
    this.jugador = new Player(this, 0, 0, "player", 0);

    // Colisiones entre el jugador y el suelo
    this.physics.add.collider(this.jugador, solidos);

    // Crear las teclas de dirección
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Actualizar el jugador
    this.jugador.update(this.cursors);
  }
}
