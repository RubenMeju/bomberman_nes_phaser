export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Escalar el sprite
    this.setScale(2);

    // Ajustar el tamaño del collider
    this.body.setSize(12, 14);

    // El jugador no puede salir del mundo
    this.setCollideWorldBounds(true);
  }

  update(cursors) {
    const velocidad = 200; // Ajusta la velocidad según sea necesario

    // Detectar si las teclas de dirección están siendo presionadas
    if (cursors.left.isDown) {
      this.setVelocityX(-velocidad); // Mover a la izquierda con velocidad
    } else if (cursors.right.isDown) {
      this.setVelocityX(velocidad); // Mover a la derecha con velocidad
    } else {
      this.setVelocityX(0); // Detener movimiento horizontal si no se presiona ninguna tecla
    }

    if (cursors.up.isDown) {
      this.setVelocityY(-velocidad); // Mover hacia arriba con velocidad
    } else if (cursors.down.isDown) {
      this.setVelocityY(velocidad); // Mover hacia abajo con velocidad
    } else {
      this.setVelocityY(0); // Detener movimiento vertical si no se presiona ninguna tecla
    }
  }
}
