import { create } from 'zustand';
import type { CaseData, Verdict } from '@/types/case';
import { runAudit } from '@/engine/audit';
import { calculateScore } from '@/engine/scoring';

interface AuditState {
  cases: CaseData[];
  currentCaseIndex: number;
  selectedContradictions: string[];
  selectedVerdict: Verdict | null;
  score: number | null;
  uiTab: 'Hull' | 'Orbit' | 'Signal' | 'Bio';
  setCases: (cases: CaseData[]) => void;
  toggleContradiction: (id: string) => void;
  submitVerdict: (verdict: Verdict) => void;
  nextCase: () => void;
  setTab: (tab: AuditState['uiTab']) => void;
}

export const useAuditStore = create<AuditState>((set, get) => ({
  cases: [],
  currentCaseIndex: 0,
  selectedContradictions: [],
  selectedVerdict: null,
  score: null,
  uiTab: 'Hull',
  setCases: (cases) => set({ cases }),
  toggleContradiction: (id) => {
    const selected = get().selectedContradictions;
    set({
      selectedContradictions: selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
    });
  },
  submitVerdict: (verdict) => {
    const state = get();
    const caseData = state.cases[state.currentCaseIndex];
    const result = runAudit(caseData);
    const score = calculateScore(
      state.selectedContradictions,
      result.contradictions,
      verdict,
      caseData.truth.requiredVerdict
    );
    set({ selectedVerdict: verdict, score });
  },
  nextCase: () => {
    const state = get();
    const next = Math.min(state.currentCaseIndex + 1, state.cases.length - 1);
    set({ currentCaseIndex: next, selectedContradictions: [], selectedVerdict: null, score: null, uiTab: 'Hull' });
  },
  setTab: (tab) => set({ uiTab: tab })
}));
