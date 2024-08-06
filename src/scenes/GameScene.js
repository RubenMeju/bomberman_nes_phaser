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

    // Crear el sprite del jugador con físicas
    this.jugador = this.physics.add.sprite(0, 0, "player", 0).setScale(2);
    this.jugador.body.setSize(12, 14);

    // El jugador no puede salir del mundo
    this.jugador.setCollideWorldBounds(true);

    // Colisiones entre el jugador y el suelo
    this.physics.add.collider(this.jugador, solidos);

    // Crear las teclas de dirección
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const velocidad = 200; // Ajusta la velocidad según sea necesario

    // Detectar si las teclas de dirección están siendo presionadas
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-velocidad); // Mover a la izquierda con velocidad
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(velocidad); // Mover a la derecha con velocidad
    } else {
      this.jugador.setVelocityX(0); // Detener movimiento horizontal si no se presiona ninguna tecla
    }

    if (this.cursors.up.isDown) {
      this.jugador.setVelocityY(-velocidad); // Mover hacia arriba con velocidad
    } else if (this.cursors.down.isDown) {
      this.jugador.setVelocityY(velocidad); // Mover hacia abajo con velocidad
    } else {
      this.jugador.setVelocityY(0); // Detener movimiento vertical si no se presiona ninguna tecla
    }
  }
}
