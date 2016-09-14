'use strict';
module.exports.version = '0.3.0';

module.exports.loop = config => {
  memoryRoomDatas(Game.rooms);
  cleanupCreepDatas();
  _.each(Game.creeps, controlCreep);
  _.each(Game.rooms, controlRoom);
};

function controlCreep(creep) {}

function controlRoom(room) {
  const towers = room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });
  _.each(towers, controlTower);
}

function controlTower(tower) {}

function cleanupCreepDatas() {
  const creepDatas = getCreepDatas();
  _.each(creepDatas, creepData => {
    const difference = Game.time - creepData.lastTime;
    if (creepData.ticksToLive - difference > 0) {
      return;
    }
    delete creepDatas[creepData.id];
  });
}

function getCreepDatas() {
  Game.Memory.creepDatas = Game.Memory.creepDatas || {};
  return Game.Memory.creepDatas;
}

function getDynamicCreepData(creep) {
  return {
    lastTime: Game.time,
    ticksToLive: creep.ticksToLive
  };
}

function getStaticCreepData() {
  return {
    id: creep.id
  };
}

function memoryCreepDatas(creeps) {
  const creepDatas = getCreepDatas();
  _.each(creeps, creep => {
    if (!creepDatas[creep.id]) {
      creepDatas[creep.id] = getStaticCreepData(creep);
    }
    Object.assign(creepDatas[creep.id], getDynamicCreepData(creep));
  });
}

function getMyUsername() {
  if (!Memory.myUsername) {
    const spawnIds = Object.keys(Game.spawns);
    if (spawnIds.length > 0) {
      Memory.myUsername = Game.spawns[spawnIds[0]].owner.username;
    }
  }
  return Memory.myUsername;
}

function getDynamicRoomData(room) {
  const hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
  memoryCreepDatas(hostileCreeps);
  return {
    hostileCreeps: _.map(hostileCreeps, creep => creep.id),
    lastTime: Game.time,
    reservation: room.getReservation()
  };
}

function getRoomDatas() {
  Game.Memory.roomDatas = Game.Memory.roomDatas || {};
  return Game.Memory.roomDatas;
}

function getStaticRoomData(room) {
  const sources = room.find(FIND_SOURCES);
  memorySourceDatas(sources);
  return {
    name: room.name,
    sources: _.map(sources, source => source.id)
  };
}

function memoryRoomDatas(rooms) {
  const roomDatas = getRoomDatas();
  _.each(rooms, room => {
    if (!roomDatas[room.name]) {
      roomDatas[room.name] = getStaticRoomData(room);
    }
    Object.assign(roomDatas[room.name], getDynamicRoomData(room));
  });
}

function getDynamicSourceData(source) {
  return {
    lastTime: Game.time
  };
}

function getHarvestPositions(source) {
  const objects = source.room.lookAtArea(
    source.pos.y - 1,
    source.pos.x - 1,
    source.pos.y + 1,
    source.pos.x + 1
  );
  const harvestPositions = [];
  _.each([source.pos.y - 1, source.pos.y, source.pos.y + 1], y => {
    _.each([source.pos.x - 1, source.pos.x, source.pos.x + 1], x => {
      if (y === source.pos.y && x === source.pos.x) {
        return;
      }
      let foundWall = false;
      _.each(objects[y][x], object => {
        if (object.type === 'terrain' && object.terrain === 'wall') {
          foundWall = true;
        }
      });
      if (foundWall) {
        return;
      }
      harvestPositions.push({ x: x, y: y });
    });
  });
  return harvestPositions;
}

function getSourceDatas() {
  Game.Memory.sourceDatas = Game.Memory.sourceDatas || {};
  return Game.Memory.sourceDatas;
}

function getStaticSourceData(source) {
  return {
    harvestPositions: getHarvestPositions(source),
    id: source.id
  };
}

function memorySourceDatas(sources) {
  const sourceDatas = getSourceDatas();
  _.each(sources, source => {
    if (!sourceDatas[source.id]) {
      sourceDatas[source.id] = getStaticSourceData(source);
    }
    Object.assign(sourceDatas[source.id], getDynamicSourceData(source));
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
