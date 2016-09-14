function memorySourceDatas(sources) {
  const sourceDatas = getSourceDatas();
  _.each(sources, source => {
    if (!sourceDatas[source.id]) {
      sourceDatas[source.id] = getStaticSourceData(source);
    }
    Object.assign(sourceDatas[source.id], getDynamicSourceData(source));
  });
}
