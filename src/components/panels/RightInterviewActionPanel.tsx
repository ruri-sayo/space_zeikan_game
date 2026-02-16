import type { CaseData, Contradiction } from '@/types/case';
import { useAuditStore } from '@/stores/auditStore';

const easyGuide = [
  '証言の「直行」と申告ルートの寄港回数が一致しているか',
  '申告待機電力と実測放熱値の関係が自然か',
  '密度（質量/容積）が申告材質の範囲に収まるか',
  '理論Δvと実測Δvの差が大きすぎないか'
];

export const RightInterviewActionPanel = ({
  caseData,
  contradictions
}: {
  caseData: CaseData;
  contradictions: Contradiction[];
}) => {
  const { selectedContradictions, toggleContradiction, gameMode } = useAuditStore();

  return (
    <aside className="panel">
      <h2>証言・判定補助</h2>
      <h3>証言ログ</h3>
      <ul>
        {caseData.interviews.map((line) => (
          <li key={line.id}>
            <strong>{line.speaker}:</strong> {line.text}
          </li>
        ))}
      </ul>

      {gameMode === 'easy' && (
        <>
          <h3>イージー向けガイダンス</h3>
          <ul>
            {easyGuide.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </>
      )}

      <h3>{gameMode === 'easy' ? '監査チェック項目（ヒントあり）' : '監査チェック項目（ヒントなし）'}</h3>
      <ul>
        {contradictions.map((c, index) => (
          <li key={c.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedContradictions.includes(c.id)}
                onChange={() => toggleContradiction(c.id)}
              />
              {gameMode === 'easy' ? (
                <span>
                  [{c.severity}] {c.reason}
                </span>
              ) : (
                <span>チェック項目 {index + 1}</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};
