export class Bomba extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(this.scene.escalado);
    this.body.setSize(12, 14);
    this.setCollideWorldBounds(true);
    this.setActive(false).setVisible(false);
  }

  explode() {
    const explosionParts = [
      { x: 0, y: 0, anim: "explosion_center" },
      { x: -32, y: 0, anim: "explosion_left" },
      { x: 32, y: 0, anim: "explosion_right" },
      { x: 0, y: -32, anim: "explosion_up" },
      { x: 0, y: 32, anim: "explosion_down" },
    ];

    explosionParts.forEach((part) => {
      const explosion = this.scene.add
        .sprite(this.x + part.x, this.y + part.y, "player")
        .setScale(this.scene.escalado);
      this.scene.physics.add.existing(explosion);
      explosion.play(part.anim);

      explosion.setSize(16, 16); // Ajustar tamaño según los frames
      explosion.setDepth(this.scene.bloques.solidos.depth - 1);

      this.scene.time.delayedCall(
        600,
        () => {
          explosion.destroy();
        },
        [],
        this
      );

      this.scene.physics.add.overlap(explosion, this.scene.jugador, () => {
        this.scene.jugador.die();
      });

      this.scene.physics.add.overlap(
        explosion,
        this.scene.enemies,
        this.scene.handleExplosionEnemyCollision,
        null,
        this
      );

      const tileX = Math.floor((this.x + part.x) / 32);
      const tileY = Math.floor((this.y + part.y) / 32);

      if (this.scene.bloques.isDestruible(tileX, tileY)) {
        this.scene.bloques.removeTileAt(tileX, tileY);
      }
    });

    this.setActive(false).setVisible(false);
    this.setPosition(-100, -100);
  }
}
