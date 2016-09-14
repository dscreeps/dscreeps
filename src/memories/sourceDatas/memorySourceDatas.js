function memorySourceDatas(sources) {
  const sourceDatas = getSourceDatas();
  _.each(sources, source => {
    if (!sourceDatas[source.id]) {
      sourceDatas[source.id] = source.getStaticMemoryData();
    }
    Object.assign(sourceDatas[source.id], source.getDynamicMemoryData())
  });
}
