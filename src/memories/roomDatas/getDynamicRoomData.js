function getDynamicRoomData(room) {
  const hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
  memoryCreepDatas(hostileCreeps);
  return {
    hostileCreeps: _.map(hostileCreeps, creep => creep.id),
    lastTime: Game.time,
    reservation: room.getReservation()
  };
}
