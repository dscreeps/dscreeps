module.exports.loop = config => {
  memoryRoomDatas(Game.rooms);
  cleanupCreepDatas();
  _.each(Game.rooms, controlRoom);
};
