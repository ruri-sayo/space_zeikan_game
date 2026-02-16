import type { Contradiction, Verdict } from '@/types/case';

const severityWeight: Record<Contradiction['severity'], number> = { critical: 5, warning: 2, info: 1 };

export const determineVerdict = (contradictions: Contradiction[]): Verdict => {
  const critical = contradictions.filter((c) => c.severity === 'critical').length;
  const warning = contradictions.filter((c) => c.severity === 'warning').length;

  if (critical > 0) return 'DETAIN';
  if (warning > 0) return 'SECONDARY_AUDIT';
  return 'CLEAR';
};

export const calculateScore = (
  selectedIds: string[],
  allContradictions: Contradiction[],
  selectedVerdict: Verdict,
  correctVerdict: Verdict
): number => {
  const selectedSet = new Set(selectedIds);
  const totalWeight = allContradictions.reduce((sum, c) => sum + severityWeight[c.severity], 0) || 1;
  const hitWeight = allContradictions
    .filter((c) => selectedSet.has(c.id))
    .reduce((sum, c) => sum + severityWeight[c.severity], 0);

  const detectionScore = Math.round((hitWeight / totalWeight) * 70);
  const verdictScore = selectedVerdict === correctVerdict ? 30 : 0;
  return detectionScore + verdictScore;
};
