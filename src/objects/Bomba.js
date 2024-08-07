export class Bomba extends Phaser.Physics.Arcade.Sprite {
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

    // Inicializar la bomba como inactiva
    this.setActive(false).setVisible(false);
  }

  createAnimations(scene) {
    scene.anims.create({
      key: "bomba",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 42,
        end: 44,
      }),
      frameRate: 4,
      repeat: -1,
    });

    scene.anims.create({
      key: "explosion_center",
      frames: [{ key: "player", frame: 86 }],
      frameRate: 10,
      repeat: 0,
    });

    scene.anims.create({
      key: "explosion_right",
      frames: [{ key: "player", frame: 85 }],
      frameRate: 10,
      repeat: 0,
    });

    scene.anims.create({
      key: "explosion_left",
      frames: [{ key: "player", frame: 87 }],
      frameRate: 10,
      repeat: 0,
    });

    scene.anims.create({
      key: "explosion_up",
      frames: [{ key: "player", frame: 72 }],
      frameRate: 10,
      repeat: 0,
    });

    scene.anims.create({
      key: "explosion_down",
      frames: [{ key: "player", frame: 100 }],
      frameRate: 10,
      repeat: 0,
    });
  }

  explode() {
    const explosionParts = [
      { x: 0, y: 0, anim: "explosion_center" },
      { x: -32, y: 0, anim: "explosion_right" },
      { x: 32, y: 0, anim: "explosion_left" },
      { x: 0, y: -32, anim: "explosion_up" },
      { x: 0, y: 32, anim: "explosion_down" },
    ];

    explosionParts.forEach((part) => {
      const explosion = this.scene.add.sprite(
        this.x + part.x,
        this.y + part.y,
        "player"
      );
      explosion.setScale(2);
      explosion.play(part.anim);

      this.scene.time.delayedCall(
        600,
        () => {
          explosion.destroy();
        },
        [],
        this
      );
    });

    // Eliminar la bomba original y reiniciar
    this.setActive(false).setVisible(false);
    this.scene.time.delayedCall(
      0,
      () => {
        this.setActive(false).setVisible(false); // Reiniciar la bomba para su reutilización
      },
      [],
      this
    );
  }

  update() {
    // La lógica de actualización puede permanecer vacía si solo estás manejando animaciones con temporizadores
  }
}
