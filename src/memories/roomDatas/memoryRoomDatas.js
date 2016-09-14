function memoryRoomDatas(rooms) {
  const roomDatas = getRoomDatas();
  _.each(rooms, room => {
    if (!roomDatas[room.name]) {
      roomDatas[room.name] = getStaticRoomData(room);
    }
    Object.assign(roomDatas[room.name], getDynamicRoomData(room));
  });
}
