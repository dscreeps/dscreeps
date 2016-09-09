'use strict';
// dscreeps.js v0.1.0

module.exports = config => {
  
};

if (!Game.Memory.username) {
  Game.Memory.username = Game.spawns[Object.keys(Game.spawns)[0]].owner.username;
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
        reservation.username !== Game.Memory.username) {
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
