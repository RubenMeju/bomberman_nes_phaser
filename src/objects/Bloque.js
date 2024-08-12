export class Bloque {
  constructor(scene, mapa, tilesetKey, layerName, collisionProperty) {
    this.scene = scene;
    this.mapa = mapa;

    // Cargar el tileset y crear la capa
    const tileset = this.mapa.addTilesetImage(tilesetKey);
    this.solidos = this.mapa.createLayer(layerName, tileset, 0, 0);
    this.solidos.setScale(this.scene.escalado);
    this.solidos.setCollisionByProperty(collisionProperty);
  }

  // Método para remover un bloque en una posición específica
  removeTileAt(x, y) {
    const tile = this.mapa.getTileAt(x, y, true, this.solidos.layer.name);

    if (tile && tile.properties.destruible) {
      // Obtener las coordenadas del tile en el mundo
      const worldX = tile.getCenterX();
      const worldY = tile.getCenterY();

      // Crear un sprite temporal para la animación de destrucción
      const destructionSprite = this.scene.add.sprite(worldX, worldY, "player");
      destructionSprite.setScale(this.scene.escalado);
      destructionSprite.play("destruction");

      // Después de que termine la animación, eliminar el sprite y el tile
      destructionSprite.on("animationcomplete", () => {
        destructionSprite.destroy();
        this.solidos.removeTileAt(x, y, true);
      });
    }
  }

  // Método para verificar si un bloque en una posición es destruible
  isDestruible(x, y) {
    const tile = this.mapa.getTileAt(x, y, true, this.solidos.layer.name);
    return tile && tile.properties.destruible;
  }
}
