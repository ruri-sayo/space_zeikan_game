import type { CaseData, Contradiction } from '@/types/case';
import { matchIsotopeBand, validateDnaMarkers } from '@/engine/bio';
import { evaluateLogicContradictions } from '@/engine/logic';
import { calcDensity, isDensityMismatch, isDvAnomaly, isThermalMismatch } from '@/engine/physics';
import { determineVerdict } from '@/engine/scoring';

export const runAudit = (caseData: CaseData): { contradictions: Contradiction[]; recommendedVerdict: string } => {
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

  if (!matchIsotopeBand(caseData.documents.travelBand, caseData.bio.isotope.actual)) {
    contradictions.push({
      id: `${caseData.id}-bio-iso`,
      layer: 'bio',
      severity: 'warning',
      reason: '渡航履歴帯と同位体帯が一致しない。',
      evidenceRefs: ['documents.travelBand', 'bio.isotope.actual'],
      rule: 'travelBand !== isotope.actual'
    });
  }

  const dna = validateDnaMarkers(caseData.documents.species, caseData.bio.dnaMarkers);
  if (dna.speciesMismatch) {
    contradictions.push({
      id: `${caseData.id}-bio-species`,
      layer: 'bio',
      severity: 'warning',
      reason: '申告品種とDNAマーカーに不一致。',
      evidenceRefs: ['documents.species', 'bio.dnaMarkers'],
      rule: 'declared species markers mismatch'
    });
  }
  if (dna.hasRisk) {
    contradictions.push({
      id: `${caseData.id}-bio-risk`,
      layer: 'bio',
      severity: 'critical',
      reason: '危険DNAマーカーを検出。',
      evidenceRefs: ['bio.dnaMarkers'],
      rule: 'contains risky marker'
    });
  }

  return { contradictions, recommendedVerdict: determineVerdict(contradictions) };
};
