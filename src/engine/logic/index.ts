import jsonLogic from 'json-logic-js';
import type { CaseData, Contradiction } from '@/types/case';

export const evaluateLogicContradictions = (caseData: CaseData): Contradiction[] => {
  const statements = {
    captainNoStops: caseData.interviews.some((i) => i.text.includes('寄港はない') || i.text.includes('直行')),
    engineerLowThermal: caseData.interviews.some((i) => i.text.includes('40kW未満') || i.text.includes('低負荷')),
    declaredStops: caseData.documents.route.declaredStops,
    thermal: caseData.telemetry.thermal.radiatorKw
  };

  const flags: Contradiction[] = [];

  const noStopsConflict = jsonLogic.apply({ and: [{ var: 'captainNoStops' }, { '>': [{ var: 'declaredStops' }, 0] }] }, statements);
  if (noStopsConflict) {
    flags.push({
      id: `${caseData.id}-logic-1`,
      layer: 'logic',
      severity: 'warning',
      reason: '証言（直行）と提出ルート（寄港あり）が矛盾。',
      evidenceRefs: ['interviews', 'documents.route.declaredStops'],
      rule: 'captainNoStops && declaredStops > 0'
    });
  }

  const thermalConflict = jsonLogic.apply(
    { and: [{ var: 'engineerLowThermal' }, { '>': [{ var: 'thermal' }, 50] }] },
    statements
  );
  if (thermalConflict) {
    flags.push({
      id: `${caseData.id}-logic-2`,
      layer: 'logic',
      severity: 'warning',
      reason: '証言（低熱）と実測放熱値が矛盾。',
      evidenceRefs: ['interviews', 'telemetry.thermal.radiatorKw'],
      rule: 'engineerLowThermal && thermal > 50'
    });
  }

  return flags;
};
