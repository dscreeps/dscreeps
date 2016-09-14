function memoryRoomDatas() {
  _.each(Game.rooms, room => {
    const roomData = {
      lastTime: Game.time,
      reservation: room.getReservation()
    };
    getRoomDatas()[room.name] = roomData;
  });
}
