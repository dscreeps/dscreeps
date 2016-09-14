function getMyUsername() {
  if (!Memory.myUsername) {
    const spawnIds = Object.keys(Game.spawns);
    if (spawnIds.length > 0) {
      Memory.myUsername = Game.spawns[spawnIds[0]].owner.username;
    }
  }
  return Memory.myUsername;
}
