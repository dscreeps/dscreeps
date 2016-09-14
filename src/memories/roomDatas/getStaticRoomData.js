function getStaticRoomData(room) {
  const sources = room.find(FIND_SOURCES);
  memorySourceDatas(sources);
  return {
    sources: _.map(sources, source => source.id)
  };
}
