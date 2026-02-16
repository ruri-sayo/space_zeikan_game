import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HomeScreen } from '@/components/HomeScreen';
import { loadAllCases } from '@/data/caseLoader';
import { useAuditStore } from '@/stores/auditStore';
import type { GameMode } from '@/stores/auditStore';

const cases = loadAllCases();

export const App = () => {
  const [started, setStarted] = useState(false);
  const { setGameMode, setCases, backToHome } = useAuditStore();

  const handleStart = (mode: GameMode) => {
    setGameMode(mode);
    setCases(cases);
    setStarted(true);
  };

  const handleBackHome = () => {
    const ok = window.confirm('ホームへ戻ると進行中の案件状態がリセットされます。戻りますか？');
    if (!ok) return;
    backToHome();
    setStarted(false);
  };

  if (!started) return <HomeScreen onStart={handleStart} />;

  return <AppShell cases={cases} onBackHome={handleBackHome} />;
};
