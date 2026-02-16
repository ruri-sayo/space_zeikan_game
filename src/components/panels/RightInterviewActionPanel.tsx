import type { CaseData, Contradiction } from '@/types/case';
import { useAuditStore } from '@/stores/auditStore';

export const RightInterviewActionPanel = ({
  caseData,
  contradictions
}: {
  caseData: CaseData;
  contradictions: Contradiction[];
}) => {
  const { selectedContradictions, toggleContradiction } = useAuditStore();

  return (
    <aside className="panel">
      <h2>Interview & Action</h2>
      <ul>
        {caseData.interviews.map((line) => (
          <li key={line.id}>
            <strong>{line.speaker}:</strong> {line.text}
          </li>
        ))}
      </ul>
      <h3>検出可能な矛盾（デバッグ表示）</h3>
      <ul>
        {contradictions.map((c) => (
          <li key={c.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedContradictions.includes(c.id)}
                onChange={() => toggleContradiction(c.id)}
              />
              [{c.severity}] {c.reason}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};
