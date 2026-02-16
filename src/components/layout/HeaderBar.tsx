export const HeaderBar = ({ title, difficulty, progress }: { title: string; difficulty: number; progress: string }) => (
  <header className="header-bar">
    <h1>Audit H680k</h1>
    <div className="meta">
      <span>{title}</span>
      <span>難易度: {difficulty}</span>
      <span>進捗: {progress}</span>
    </div>
  </header>
);
