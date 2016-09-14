function getStaticSourceData(source) {
  return {
    harvestPositions: getHarvestPositions(source),
    id: source.id
  };
}
