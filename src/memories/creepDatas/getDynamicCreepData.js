function getDynamicCreepData(creep) {
  return {
    lastTime: Game.time,
    ticksToLive: creep.ticksToLive
  };
}
