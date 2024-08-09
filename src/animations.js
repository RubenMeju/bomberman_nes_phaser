export function createAnimations(scene) {
  scene.anims.create({
    key: "bomba",
    frames: scene.anims.generateFrameNumbers("player", { start: 42, end: 44 }),
    frameRate: 4,
    repeat: -1,
  });

  const frameRateExplosion = 4;

  const explosionFrames = (frames) => {
    return frames.map((frame) => ({ key: "player", frame: frame }));
  };

  // Centro
  scene.anims.create({
    key: "explosion_center",
    frames: explosionFrames([86, 91, 149, 154]),
    frameRate: frameRateExplosion,
    repeat: 0,
  });

  // Derecha
  scene.anims.create({
    key: "explosion_right",
    frames: explosionFrames([87, 92, 150, 165]),
    frameRate: frameRateExplosion,
    repeat: 0,
  });

  // Izquierda
  scene.anims.create({
    key: "explosion_left",
    frames: explosionFrames([85, 90, 148, 153]),
    frameRate: frameRateExplosion,
    repeat: 0,
  });

  // Arriba
  scene.anims.create({
    key: "explosion_up",
    frames: explosionFrames([72, 77, 135, 140]),
    frameRate: frameRateExplosion,
    repeat: 0,
  });

  // Abajo
  scene.anims.create({
    key: "explosion_down",
    frames: explosionFrames([100, 105, 171, 176]),
    frameRate: frameRateExplosion,
    repeat: 0,
  });

  // Destrucción
  scene.anims.create({
    key: "destruction",
    frames: scene.anims.generateFrameNumbers("player", { start: 47, end: 52 }),
    frameRate: 18,
    repeat: 0,
  });
}
