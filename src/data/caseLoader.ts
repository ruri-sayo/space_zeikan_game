import type { CaseData } from '@/types/case';
import { caseIndexSchema, caseSchema } from '@/types/schema';

import indexJson from '@/data/cases/index.json';
import case001 from '@/data/cases/case-001.json';
import case002 from '@/data/cases/case-002.json';
import case003 from '@/data/cases/case-003.json';
import case004 from '@/data/cases/case-004.json';
import case005 from '@/data/cases/case-005.json';
import case006 from '@/data/cases/case-006.json';
import case007 from '@/data/cases/case-007.json';
import case008 from '@/data/cases/case-008.json';
import case009 from '@/data/cases/case-009.json';
import case010 from '@/data/cases/case-010.json';

const map: Record<string, unknown> = {
  'case-001': case001,
  'case-002': case002,
  'case-003': case003,
  'case-004': case004,
  'case-005': case005,
  'case-006': case006,
  'case-007': case007,
  'case-008': case008,
  'case-009': case009,
  'case-010': case010
};

export const caseIndex = caseIndexSchema.parse(indexJson);

export const loadCase = (id: string): CaseData => caseSchema.parse(map[id]);

export const loadAllCases = (): CaseData[] => caseIndex.map((entry) => loadCase(entry.id));
