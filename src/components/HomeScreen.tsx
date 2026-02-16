import type { GameMode } from '@/stores/auditStore';

export const HomeScreen = ({ onStart }: { onStart: (mode: GameMode) => void }) => (
  <main className="home-screen">
    <section className="home-card">
      <h1>太平洋H680k 宇宙港・ロジック監査</h1>
      <p>物理学データと証言の矛盾を見つけ、正しい監査判定を下してください。</p>
      <div className="home-actions">
        <button onClick={() => onStart('easy')}>イージーではじめる（ガイダンスあり）</button>
        <button onClick={() => onStart('hard')}>ハードではじめる（ヒントなし）</button>
      </div>
    </section>
  </main>
);
