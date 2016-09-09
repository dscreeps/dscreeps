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
