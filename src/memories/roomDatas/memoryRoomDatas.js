function memoryRoomDatas() {
  _.each(Game.rooms, room => {
    getRoomDatas()[room.name] = room.getMemoryData();
  });
}
