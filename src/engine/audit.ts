import type { CaseData, Contradiction, Verdict } from '@/types/case';
import { evaluateLogicContradictions } from '@/engine/logic';
import { calcDensity, isDensityMismatch, isDvAnomaly, isThermalMismatch } from '@/engine/physics';
import { determineVerdict } from '@/engine/scoring';

export const runAudit = (caseData: CaseData): { contradictions: Contradiction[]; recommendedVerdict: Verdict } => {
  const contradictions: Contradiction[] = [];

  contradictions.push(...evaluateLogicContradictions(caseData));

  const density = calcDensity(caseData.documents.manifest.massKg, caseData.documents.manifest.volumeM3);
  const densityResult = isDensityMismatch(density, caseData.documents.manifest.material);
  if (densityResult.mismatch && densityResult.severity) {
    contradictions.push({
      id: `${caseData.id}-phy-density`,
      layer: 'physics',
      severity: densityResult.severity,
      reason: `密度乖離(${Math.round(densityResult.deviationRatio * 100)}%)を検出。`,
      evidenceRefs: ['documents.manifest'],
      rule: 'density deviation >= 12%'
    });
  }

  if (isDvAnomaly(caseData.telemetry.orbit.expectedDv, caseData.telemetry.orbit.actualDv)) {
    contradictions.push({
      id: `${caseData.id}-phy-dv`,
      layer: 'physics',
      severity: 'critical',
      reason: 'Δvが理論値を15%以上超過。',
      evidenceRefs: ['telemetry.orbit'],
      rule: 'actualDv > expectedDv * 1.15'
    });
  }

  const thermalResult = isThermalMismatch(caseData.documents.power.idleKw, caseData.telemetry.thermal.radiatorKw);
  if (thermalResult.mismatch && thermalResult.severity) {
    contradictions.push({
      id: `${caseData.id}-phy-thermal`,
      layer: 'physics',
      severity: thermalResult.severity,
      reason: `放熱値が待機電力比で${Math.round(thermalResult.overRatio * 100)}%超過。`,
      evidenceRefs: ['documents.power.idleKw', 'telemetry.thermal.radiatorKw'],
      rule: 'radiatorKw significantly exceeds idleKw'
    });
  }

  return { contradictions, recommendedVerdict: determineVerdict(contradictions) };
};
