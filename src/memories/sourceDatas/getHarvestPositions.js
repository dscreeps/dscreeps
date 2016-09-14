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
