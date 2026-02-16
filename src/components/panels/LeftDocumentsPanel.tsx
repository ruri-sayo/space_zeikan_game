import type { CaseData } from '@/types/case';

export const LeftDocumentsPanel = ({ caseData }: { caseData: CaseData }) => (
  <aside className="panel">
    <h2>Documents</h2>
    <pre>{JSON.stringify(caseData.documents, null, 2)}</pre>
  </aside>
);
