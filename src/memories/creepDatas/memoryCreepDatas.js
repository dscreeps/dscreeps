function memoryCreepDatas(creeps) {
  const creepDatas = getCreepDatas();
  _.each(creeps, creep => {
    if (creepDatas[creep.id]) {
      return;
    }
    creepDatas[creep.id] = creep.getMemoryData();
  });
}
