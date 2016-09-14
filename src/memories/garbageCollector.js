function garbageCollector() {
  for(const creepName in Memory.creeps) {
    if(!Game.creeps[creepName]) {
      delete Memory.creeps[creepName];
    }
  }
  for (const spawnName in Memory.spawns) {
    if (!Game.spawns[spawnName]) {
      delete Memory.spawns[spawnName];
    }
  }
}
