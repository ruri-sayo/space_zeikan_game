import { useMemo } from 'react';
import type { CaseData, Verdict } from '@/types/case';
import { useAuditStore } from '@/stores/auditStore';
import { runAudit } from '@/engine/audit';
import { HeaderBar } from '@/components/layout/HeaderBar';
import { LeftDocumentsPanel } from '@/components/panels/LeftDocumentsPanel';
import { CenterVisualizerPanel } from '@/components/panels/CenterVisualizerPanel';
import { RightInterviewActionPanel } from '@/components/panels/RightInterviewActionPanel';
import { ResultModal } from '@/components/modals/ResultModal';

export const AppShell = ({ cases }: { cases: CaseData[] }) => {
  const { setCases, currentCaseIndex, selectedVerdict, score, submitVerdict, nextCase } = useAuditStore();
  useMemo(() => setCases(cases), [cases, setCases]);

  const current = cases[currentCaseIndex];
  const auditResult = runAudit(current);

  return (
    <main className="app-shell">
      <HeaderBar title={current.title} difficulty={current.difficulty} progress={`${currentCaseIndex + 1}/${cases.length}`} />
      <section className="grid">
        <LeftDocumentsPanel caseData={current} />
        <CenterVisualizerPanel caseData={current} />
        <RightInterviewActionPanel caseData={current} contradictions={auditResult.contradictions} />
      </section>
      <div className="actions">
        {(['CLEAR', 'SECONDARY_AUDIT', 'DETAIN'] as Verdict[]).map((verdict) => (
          <button key={verdict} onClick={() => submitVerdict(verdict)}>{verdict}</button>
        ))}
      </div>
      <ResultModal
        open={Boolean(selectedVerdict)}
        score={score}
        selectedVerdict={selectedVerdict}
        expectedVerdict={current.truth.requiredVerdict}
        onNext={nextCase}
      />
    </main>
  );
};
