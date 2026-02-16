import { create } from 'zustand';
import type { CaseData, Verdict } from '@/types/case';
import { runAudit } from '@/engine/audit';
import { calculateScore } from '@/engine/scoring';

export type GameMode = 'easy' | 'hard';

interface AuditState {
  cases: CaseData[];
  currentCaseIndex: number;
  selectedContradictions: string[];
  selectedVerdict: Verdict | null;
  score: number | null;
  uiTab: 'Orbit' | 'Signal';
  gameMode: GameMode;
  setCases: (cases: CaseData[]) => void;
  setGameMode: (mode: GameMode) => void;
  toggleContradiction: (id: string) => void;
  submitVerdict: (verdict: Verdict) => void;
  nextCase: () => void;
  backToHome: () => void;
  setTab: (tab: AuditState['uiTab']) => void;
}

export const useAuditStore = create<AuditState>((set, get) => ({
  cases: [],
  currentCaseIndex: 0,
  selectedContradictions: [],
  selectedVerdict: null,
  score: null,
  uiTab: 'Orbit',
  gameMode: 'easy',
  setCases: (cases) => set({ cases }),
  setGameMode: (mode) => set({ gameMode: mode }),
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
    set({ currentCaseIndex: next, selectedContradictions: [], selectedVerdict: null, score: null, uiTab: 'Orbit' });
  },
  backToHome: () =>
    set({
      currentCaseIndex: 0,
      selectedContradictions: [],
      selectedVerdict: null,
      score: null,
      uiTab: 'Orbit'
    }),
  setTab: (tab) => set({ uiTab: tab })
}));
