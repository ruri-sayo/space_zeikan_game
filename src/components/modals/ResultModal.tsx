import type { Verdict } from '@/types/case';

const verdictLabel: Record<Verdict, string> = {
  CLEAR: '問題なし（CLEAR）',
  SECONDARY_AUDIT: '二次監査（SECONDARY AUDIT）',
  DETAIN: '拘留（DETAIN）'
};

export const ResultModal = ({
  open,
  score,
  selectedVerdict,
  expectedVerdict,
  onNext
}: {
  open: boolean;
  score: number | null;
  selectedVerdict: Verdict | null;
  expectedVerdict: Verdict;
  onNext: () => void;
}) => {
  if (!open) return null;
  const correct = selectedVerdict === expectedVerdict;
  return (
    <div className="result-modal">
      <div className="modal-inner">
        <h2>{correct ? '判定成功' : '判定失敗'}</h2>
        <p>あなたの判定: {selectedVerdict ? verdictLabel[selectedVerdict] : '-'}</p>
        <p>正答判定: {verdictLabel[expectedVerdict]}</p>
        <p>スコア: {score ?? 0}</p>
        <button onClick={onNext}>次の案件へ</button>
      </div>
    </div>
  );
};
