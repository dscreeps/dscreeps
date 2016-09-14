Room.prototype.getMemoryData =
  function () {
    return {
      hostileCreepDatas: _.keyBy(
        _.map(this.find(FIND_HOSTILE_CREEPS), creep => creep.getMemoryData()),
        'id'
      ),
      lastTime: Game.time,
      reservation: this.getReservation()
    };
  };
