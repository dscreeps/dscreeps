function memoryCreepDatas(creeps) {
  const creepDatas = getCreepDatas();
  _.each(creeps, creep => {
    if (!creepDatas[creep.id]) {
      creepDatas[creep.id] = creep.getStaticMemoryData();
    }
    Object.assign(creepDatas[creep.id], creep.getDynamicMemoryData())
  });
}
