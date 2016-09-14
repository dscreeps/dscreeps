'use strict';
module.exports.version = '0.3.0';

module.exports.loop = config => {
  memoryRoomDatas();
  _.each(Game.rooms, controlRoom);
};

function controlRoom(room) {}

function getMyUsername() {
  if (!Memory.myUsername) {
    const spawnIds = Object.keys(Game.spawns);
    if (spawnIds.length > 0) {
      Memory.myUsername = Game.spawns[spawnIds[0]].owner.username;
    }
  }
  return Memory.myUsername;
}

function getRoomDatas() {
  Game.Memory.roomDatas = Game.Memory.roomDatas || {};
  return Game.Memory.roomDatas;
}

function memoryRoomDatas() {
  _.each(Game.rooms, room => {
    const roomData = {
      lastTime: Game.time,
      reservation: room.getReservation()
    };
    getRoomDatas()[room.name] = roomData;
  });
}

Creep.prototype.moveToAnd =
  function (functionName, args) {
    if (!Array.isArray(args)) {
      args = [args];
    }
    const ret = this[functionName].apply(this, args);
    if (ret === ERR_NOT_IN_RANGE) {
      this.moveTo(args[0]);
    } else {
      return ret;
    }
  };

Room.prototype.getMy =
  function () {
    if (!this.controller) {
      return;
    }
    return this.controller.my;
  };

Room.prototype.getMyReservation =
  function () {
    const reservation = this.getReservation();
    if (!reservation ||
        reservation.username !== getMyUsername()) {
      return;
    }
    return reservation;
  };

Room.prototype.getReservation =
  function () {
    if (!this.controller) {
      return;
    }
    return this.controller.reservation;
  };

RoomObject.prototype.isEmpty =
  function (opts) {
    opts = opts || {};
    opts.RESOURCE = opts.RESOURCE || RESOURCE_ENERGY;
    opts.restAmount = opts.restAmount || 0;

    if (this.carryCapacity > 0) {
      return this.carry[opts.RESOURCE] <= opts.restAmount;
    }

    if (this.energyCapacity > 0) {
      return this.energy <= opts.restAmount;
    }

    if (this.storeCapacity > 0) {
      return this.store[opts.RESOURCE] <= opts.restAmount;
    }
  };

RoomObject.prototype.isFull =
  function (opts) {
    opts = opts || {};
    opts.percentage = opts.percentage || 1;
    opts.restCapacity = opts.restCapacity || 0;

    let amount;
    let capacity;

    if (this.carryCapacity > 0) {
      amount = _.sum(this.carry);
      capacity = this.carryCapacity;
    }

    if (this.energyCapacity > 0) {
      amount = this.energy;
      capacity = this.energyCapacity;
    }

    if (this.storeCapacity > 0) {
      amount = _.sum(this.store);
      capacity = this.storeCapacity;
    }

    if (capacity > 0) {
      return (amount / capacity) >= opts.percentage ||
             (capacity - amount) < opts.restCapacity;
    }
  };
