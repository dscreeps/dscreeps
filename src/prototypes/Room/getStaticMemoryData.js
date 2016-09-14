Room.prototype.getStaticMemoryData =
  function () {
    const sources = this.find(FIND_SOURCES);
    memorySourceDatas(sources);
    return {
      sources: _.map(sources, source => source.id)
    };
  };
