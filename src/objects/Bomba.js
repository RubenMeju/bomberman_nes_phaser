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
      const explosion = this.scene.physics.add.sprite(
        this.x + part.x,
        this.y + part.y,
        "player"
      );
      explosion.setScale(2);
      explosion.play(part.anim);

      explosion.setSize(32, 32); // Tamaño del sprite de explosión
      explosion.body.setOffset(-16, -16); // Ajustar el offset si es necesario

      // Establecer la profundidad de la explosión para que quede detrás de los sólidos
      explosion.setDepth(this.scene.solidos.depth - 1);

      // Destruir la explosión después de un tiempo
      this.scene.time.delayedCall(
        600,
        () => {
          explosion.destroy();
        },
        [],
        this
      );

      // Detectar colisión con el jugador
      this.scene.physics.add.overlap(explosion, this.scene.jugador, () => {
        this.scene.jugador.die();
      });

      // Ajustar el tamaño del tile si es necesario
      const tileX = Math.floor((this.x + part.x) / 32);
      const tileY = Math.floor((this.y + part.y) / 32);

      // Obtener el tile en la capa "solidos"
      const tile = this.scene.mapa.getTileAt(tileX, tileY, true, "solidos");

      if (tile && tile.properties.destruible) {
        this.scene.solidos.removeTileAt(tileX, tileY, true);
      }
    });

    // Reiniciar la bomba para su reutilización
    this.setActive(false).setVisible(false);
    this.setPosition(-100, -100);
  }

  update() {}
}
