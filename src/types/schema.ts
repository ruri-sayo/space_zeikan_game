import { z } from 'zod';

export const caseSchema = z.object({
  id: z.string(),
  title: z.string(),
  difficulty: z.number().int().min(1).max(5),
  brief: z.string(),
  documents: z.object({
    manifest: z.object({ massKg: z.number().positive(), volumeM3: z.number().positive(), material: z.string() }),
    route: z.object({ from: z.string(), to: z.string(), etaHours: z.number().positive(), declaredStops: z.number().int().min(0) }),
    power: z.object({ idleKw: z.number().positive() }),
    species: z.string().optional(),
    travelBand: z.string().optional()
  }),
  telemetry: z.object({
    orbit: z.object({ expectedDv: z.number().positive(), actualDv: z.number().positive() }),
    vibration: z.object({ peaksHz: z.array(z.number().positive()) }),
    thermal: z.object({ radiatorKw: z.number().positive() })
  }),
  bio: z.object({
    isotope: z.object({ expected: z.string(), actual: z.string() }),
    dnaMarkers: z.array(z.string())
  }),
  interviews: z.array(z.object({ id: z.string(), speaker: z.string(), text: z.string() })),
  truth: z.object({
    requiredVerdict: z.enum(['CLEAR', 'SECONDARY_AUDIT', 'DETAIN']),
    contradictions: z.array(
      z.object({
        id: z.string(),
        layer: z.enum(['logic', 'physics']),
        severity: z.enum(['critical', 'warning', 'info']),
        reason: z.string(),
        evidenceRefs: z.array(z.string()),
        rule: z.string()
      })
    )
  })
});

export const caseIndexSchema = z.array(
  z.object({ id: z.string(), title: z.string(), difficulty: z.number().int().min(1).max(5) })
);
