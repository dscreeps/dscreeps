function getMyUsername() {
  if (!Game.Memory.myUsername) {
    const spawnIds = Object.keys(Game.spawns);
    if (spawnIds.length > 0) {
      Game.Memory.myUsername = Game.spawns[spawnIds[0]].owner.username;
    }
  }
  return Game.Memory.myUsername;
}
