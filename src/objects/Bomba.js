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

    // Crear las animaciones
    this.createAnimations(scene);
  }

  createAnimations(scene) {
    // Animación para mover a la izquierda
    scene.anims.create({
      key: "bomba",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 42,
        end: 44,
      }),
      frameRate: 4,
      repeat: -1,
    });
  }
  update() {
    this.anims.play("bomba", true);
  }
}
