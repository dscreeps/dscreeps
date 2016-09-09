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
