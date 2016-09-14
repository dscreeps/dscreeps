function memoryRoomDatas(rooms) {
  const roomDatas = getRoomDatas();
  _.each(rooms, room => {
    if (!roomDatas[room.name]) {
      roomDatas[room.name] = room.getStaticMemoryData();
    }
    Object.assign(roomDatas[room.name], room.getDynamicMemoryData())
  });
}
