Room.prototype.getMemoryData =
  function () {
    const hostileCreeps = this.find(FIND_HOSTILE_CREEPS);
    memoryCreepDatas(hostileCreeps);
    return {
      hostileCreeps: _.map(hostileCreeps, creep => creep.id),
      lastTime: Game.time,
      reservation: this.getReservation()
    };
  };
