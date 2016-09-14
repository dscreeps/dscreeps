module.exports.loop = config => {
  memoryRoomDatas(Game.rooms);
  cleanupCreepDatas();
  _.each(Game.creeps, controlCreep);
  _.each(Game.rooms, controlRoom);
};
