export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Escalar el sprite
    this.setScale(2);

    // Ajustar el tamaño del collider
    this.body.setSize(12, 14);

    // Velocidad del enemigo
    this.velocidad = 65;

    // Estado de muerte
    this.alive = true;

    // Dirección inicial
    this.direccion = "derecha"; // Puede ser 'derecha', 'izquierda', 'arriba', 'abajo'

    // Escuchar el evento de colisión con los bordes del mundo
    this.body.onWorldBounds = true;
    scene.physics.world.on(
      "worldbounds",
      this.handleWorldBoundsCollision,
      this
    );
  }

  update() {
    this.anims.play("right_enemy1", true);

    // Ajusta la velocidad según la dirección
    if (this.direccion === "derecha") {
      this.setVelocityX(this.velocidad);
      this.setVelocityY(0);
    } else if (this.direccion === "izquierda") {
      this.setVelocityX(-this.velocidad);
      this.setVelocityY(0);
    } else if (this.direccion === "arriba") {
      this.setVelocityY(-this.velocidad);
      this.setVelocityX(0);
    } else if (this.direccion === "abajo") {
      this.setVelocityY(this.velocidad);
      this.setVelocityX(0);
    }
  }

  changeDirection() {
    // Array con las posibles direcciones
    const direcciones = ["derecha", "izquierda", "arriba", "abajo"];

    // Elegir una dirección aleatoria diferente a la actual
    let nuevaDireccion = this.direccion;
    while (nuevaDireccion === this.direccion) {
      nuevaDireccion =
        direcciones[Math.floor(Math.random() * direcciones.length)];
    }

    // Asignar la nueva dirección
    this.direccion = nuevaDireccion;
  }

  handleWorldBoundsCollision(body) {
    // Verifica si el cuerpo que colisionó con los bordes es este enemigo
    if (body.gameObject === this) {
      this.changeDirection();
    }
  }

  die(enemy) {
    console.log("muere die enemigo", enemy);
    if (this.alive) {
      this.alive = false;

      this.anims.play("death_enemy1", true); // Asegúrate de usar el segundo argumento 'true' para forzar la reproducción

      this.body.setVelocity(0, 0); // Detener el movimiento
      this.body.enable = false; // Desactivar el cuerpo para evitar colisiones

      this.once("animationcomplete", () => {
        this.setVisible(false); // Ocultar el enemigo después de que termine la animación
        this.destroy(); // Eliminar el enemigo de la escena
      });

      // Si deseas eliminar el enemigo con un retraso, puedes usar el delayedCall
      this.scene.time.delayedCall(1000, () => {
        if (this.visible) {
          this.setVisible(false); // Opcional: ocultar el jugador después de morir
        }
        this.destroy(); // Asegúrate de que se elimine el enemigo
      });
    }
  }
}
