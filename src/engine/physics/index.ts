import { materialDensityKgM3 } from './materials';
import type { Severity } from '@/types/case';

export const calcDensity = (massKg: number, volumeM3: number): number => massKg / volumeM3;

export const isDensityMismatch = (
  actualDensity: number,
  declaredMaterial: string
): { mismatch: boolean; severity?: Severity; deviationRatio: number } => {
  const declared = materialDensityKgM3[declaredMaterial];
  if (!declared) return { mismatch: false, deviationRatio: 0 };
  const deviationRatio = Math.abs(actualDensity - declared) / declared;
  if (deviationRatio >= 0.2) return { mismatch: true, severity: 'critical', deviationRatio };
  if (deviationRatio >= 0.12) return { mismatch: true, severity: 'warning', deviationRatio };
  return { mismatch: false, deviationRatio };
};

export const isDvAnomaly = (expectedDv: number, actualDv: number, threshold = 0.15): boolean =>
  actualDv > expectedDv * (1 + threshold);

export const isThermalMismatch = (
  idleKw: number,
  radiatorKw: number,
  allowance = 0.2
): { mismatch: boolean; severity?: Severity; overRatio: number } => {
  const overRatio = (radiatorKw - idleKw) / idleKw;
  if (overRatio >= 0.5) return { mismatch: true, severity: 'critical', overRatio };
  if (overRatio >= allowance) return { mismatch: true, severity: 'warning', overRatio };
  return { mismatch: false, overRatio };
};
