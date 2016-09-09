if (!Game.Memory.username) {
  Game.Memory.username = Game.spawns[Object.keys(Game.spawns)[0]].owner.username;
}
