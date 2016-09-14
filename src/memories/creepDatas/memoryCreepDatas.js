function memoryCreepDatas(creeps) {
  const creepDatas = getCreepDatas();
  _.each(creeps, creep => {
    if (!creepDatas[creep.id]) {
      creepDatas[creep.id] = getStaticCreepData(creep);
    }
    Object.assign(creepDatas[creep.id], getDynamicCreepData(creep));
  });
}
