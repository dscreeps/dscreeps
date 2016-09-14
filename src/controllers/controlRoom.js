function controlRoom(room) {
  const towers = room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });
  _.each(towers, controlTower);
}
