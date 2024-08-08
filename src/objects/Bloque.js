export class Bloque {
  constructor(
    scene,
    mapa,
    tilesetKey,
    layerName,
    collisionProperty,
    scale = 2
  ) {
    this.scene = scene;
    this.mapa = mapa;

    // Cargar el tileset
    const tilesets = this.mapa.addTilesetImage(tilesetKey, tilesetKey);

    // Crear la capa de bloques sólidos
    this.solidos = this.mapa
      .createLayer(layerName, tilesets, 0, 0)
      .setScale(scale);

    // Configurar colisiones
    this.solidos.setCollisionByProperty(collisionProperty);
  }

  // Método para remover un bloque en una posición específica
  removeTileAt(x, y) {
    this.solidos.removeTileAt(x, y, true);
  }

  // Método para verificar si un bloque en una posición es destruible
  isDestruible(x, y) {
    const tile = this.mapa.getTileAt(x, y, true, this.solidos.layer.name);
    return tile && tile.properties.destruible;
  }
}
