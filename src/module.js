module.exports.loop = config => {
  memoryRoomDatas();
  _.each(Game.rooms, controlRoom);
};
