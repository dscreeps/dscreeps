function memoryUsername() {
  if (!Game.Memory.username) {
    const spawnIds = Object.keys(Game.spawns);
    if (spawnIds.length > 0) {
      Game.Memory.username = Game.spawns[spawnIds[0]].owner.username;
    }
  }
}
