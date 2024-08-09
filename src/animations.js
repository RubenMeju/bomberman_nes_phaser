// animations.js
export function createAnimations(scene) {
  scene.anims.create({
    key: "bomba",
    frames: scene.anims.generateFrameNumbers("player", { start: 42, end: 44 }),
    frameRate: 4,
    repeat: -1,
  });

  scene.anims.create({
    key: "explosion_center",
    frames: scene.anims.generateFrameNumbers("player", { start: 86, end: 91 }),
    frameRate: 2,
    repeat: 0,
  });

  scene.anims.create({
    key: "explosion_right",
    frames: [
      { key: "player", frame: 85 },
      { key: "player", frame: 92 },
    ],
    frameRate: 2,
    repeat: 0,
  });

  scene.anims.create({
    key: "explosion_left",
    frames: [
      { key: "player", frame: 87 },
      { key: "player", frame: 90 },
    ],
    frameRate: 2,
    repeat: 0,
  });

  scene.anims.create({
    key: "explosion_up",
    frames: [
      { key: "player", frame: 72 },
      { key: "player", frame: 77 },
    ],
    frameRate: 2,
    repeat: 0,
  });

  scene.anims.create({
    key: "explosion_down",
    frames: [
      { key: "player", frame: 100 },
      { key: "player", frame: 105 },
    ],
    frameRate: 2,
    repeat: 0,
  });

  scene.anims.create({
    key: "destruction",
    frames: scene.anims.generateFrameNumbers("player", { start: 47, end: 52 }),
    frameRate: 18,
    repeat: 0,
  });
}
