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

    //velocidad del jugador
    this.velocidad = 100;
    // Estado de muerte
    this.alive = true;

    // Crear las animaciones
    this.createAnimations(scene);
  }

  createAnimations(scene) {
    // Animación para mover a la izquierda
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animación para mover a la derecha
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 14,
        end: 16,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animación para mover hacia arriba
    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 17,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animación para mover hacia abajo (cuarta fila)
    scene.anims.create({
      key: "down",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "death",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 28,
        end: 34,
      }),
      frameRate: 7,
      repeat: -1,
    });
  }

  update(cursors) {
    if (!this.alive) {
      this.setVelocity(0, 0); // Detener el movimiento si está muerto
      return;
    }

    // Detectar si las teclas de dirección están siendo presionadas
    if (cursors.left.isDown) {
      this.setVelocityX(-this.velocidad); // Mover a la izquierda con velocidad
      this.anims.play("left", true); // Reproducir animación hacia la izquierda
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.velocidad); // Mover a la derecha con velocidad
      this.anims.play("right", true); // Reproducir animación hacia la derecha
    } else {
      this.setVelocityX(0); // Detener movimiento horizontal si no se presiona ninguna tecla
    }

    if (cursors.up.isDown) {
      this.setVelocityY(-this.velocidad); // Mover hacia arriba con velocidad
      this.anims.play("up", true); // Reproducir animación hacia arriba
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.velocidad); // Mover hacia abajo con velocidad
      this.anims.play("down", true); // Reproducir animación hacia abajo
    } else {
      this.setVelocityY(0); // Detener movimiento vertical si no se presiona ninguna tecla
    }

    // Detener la animación si no se presiona ninguna tecla
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      this.anims.stop();
    }
  }

  die() {
    if (this.alive) {
      this.alive = false;
      this.anims.play("death"); // Reproducir la animación de muerte
      this.body.setVelocity(0, 0); // Detener el movimiento

      this.scene.time.delayedCall(1000, () => {
        this.setVisible(false); // Opcional: ocultar el jugador después de morir
      });
    }
  }
}
