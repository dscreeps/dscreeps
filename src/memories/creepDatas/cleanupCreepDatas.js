function cleanupCreepDatas() {
  const creepDatas = getCreepDatas();
  _.each(creepDatas, creepData => {
    const difference = Game.time - creepData.lastTime;
    if (creepData.ticksToLive - difference > 0) {
      return;
    }
    delete creepDatas[creepData.id];
  });
}
