export type Verdict = 'CLEAR' | 'SECONDARY_AUDIT' | 'DETAIN';
export type Severity = 'critical' | 'warning' | 'info';
export type Layer = 'logic' | 'physics';

export interface InterviewLine {
  id: string;
  speaker: string;
  text: string;
}

export interface Contradiction {
  id: string;
  layer: Layer;
  severity: Severity;
  reason: string;
  evidenceRefs: string[];
  rule: string;
}

export interface CaseData {
  id: string;
  title: string;
  difficulty: number;
  brief: string;
  documents: {
    manifest: { massKg: number; volumeM3: number; material: string };
    route: { from: string; to: string; etaHours: number; declaredStops: number };
    power: { idleKw: number };
    species?: string;
    travelBand?: string;
  };
  telemetry: {
    orbit: { expectedDv: number; actualDv: number };
    vibration: { peaksHz: number[] };
    thermal: { radiatorKw: number };
  };
  bio: {
    isotope: { expected: string; actual: string };
    dnaMarkers: string[];
  };
  interviews: InterviewLine[];
  truth: {
    requiredVerdict: Verdict;
    contradictions: Contradiction[];
  };
}
