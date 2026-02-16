import type { GameMode } from '@/stores/auditStore';

export const HeaderBar = ({
  title,
  difficulty,
  progress,
  mode,
  onBackHome
}: {
  title: string;
  difficulty: number;
  progress: string;
  mode: GameMode;
  onBackHome: () => void;
}) => (
  <header className="header-bar">
    <h1>Audit H680k</h1>
    <div className="meta">
      <span>{title}</span>
      <span>難易度: {difficulty}</span>
      <span>進捗: {progress}</span>
      <span>モード: {mode === 'easy' ? 'Easy' : 'Hard'}</span>
      <button onClick={onBackHome}>ホームに戻る</button>
    </div>
  </header>
);
