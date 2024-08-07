export class Bomba extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);
    this.body.setSize(12, 14);
    this.setCollideWorldBounds(true);
    this.setActive(false).setVisible(false);
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

    // Reiniciar la bomba para su reutilización
    this.setActive(false).setVisible(false);
    this.setPosition(-100, -100); // Muevo la bomba fuera de la pantalla para evitar colisiones.
  }

  update() {}
}
