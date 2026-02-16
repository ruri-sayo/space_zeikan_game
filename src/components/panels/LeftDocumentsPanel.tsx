import type { CaseData } from '@/types/case';

export const LeftDocumentsPanel = ({ caseData }: { caseData: CaseData }) => (
  <aside className="panel">
    <h2>申告書類・スペック</h2>
    <p className="panel-note">税関に提出された申告書と機体スペックです（旧Documents）。</p>
    <pre>{JSON.stringify(caseData.documents, null, 2)}</pre>
  </aside>
);
