module.exports.loop = config => {
  memoryRoomDatas(Game.rooms);
  _.each(Game.rooms, controlRoom);
};
