function memoryRoomDatas(rooms) {
  _.each(rooms, room => {
    getRoomDatas()[room.name] = room.getMemoryData();
  });
}
