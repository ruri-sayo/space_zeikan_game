import type { Verdict } from '@/types/case';

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
        <p>あなたの判定: {selectedVerdict}</p>
        <p>正答判定: {expectedVerdict}</p>
        <p>スコア: {score ?? 0}</p>
        <button onClick={onNext}>次の案件へ</button>
      </div>
    </div>
  );
};
