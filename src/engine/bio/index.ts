const riskyMarkers = new Set(['MKR-X9', 'MKR-HAZ', 'MKR-BIOLOCK']);

export const matchIsotopeBand = (historyBand: string | undefined, actualBand: string): boolean => {
  if (!historyBand) return true;
  return historyBand === actualBand;
};

export const validateDnaMarkers = (declaredSpecies: string | undefined, markers: string[]) => {
  const hasRisk = markers.some((marker) => riskyMarkers.has(marker));
  const speciesRules: Record<string, string[]> = {
    kelp: ['MKR-12', 'MKR-44'],
    algae: ['MKR-22', 'MKR-61'],
    yeast: ['MKR-07', 'MKR-10']
  };

  const required = declaredSpecies ? speciesRules[declaredSpecies] ?? [] : [];
  const speciesMismatch = required.length > 0 ? required.some((m) => !markers.includes(m)) : false;

  return { hasRisk, speciesMismatch };
};
