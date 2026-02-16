import type { CaseData } from '@/types/case';
import { useAuditStore } from '@/stores/auditStore';
import { OrbitView } from '@/components/visualizers/OrbitView';
import { SignalView } from '@/components/visualizers/SignalView';

export const CenterVisualizerPanel = ({ caseData }: { caseData: CaseData }) => {
  const { uiTab, setTab } = useAuditStore();
  return (
    <section className="panel">
      <h2>物理可視化</h2>
      <div className="tabs">
        {(['Orbit', 'Signal'] as const).map((tab) => (
          <button key={tab} className={uiTab === tab ? 'active' : ''} onClick={() => setTab(tab)}>{tab}</button>
        ))}
      </div>
      {uiTab === 'Orbit' && (
        <OrbitView expectedDv={caseData.telemetry.orbit.expectedDv} actualDv={caseData.telemetry.orbit.actualDv} />
      )}
      {uiTab === 'Signal' && <SignalView peaks={caseData.telemetry.vibration.peaksHz} />}
    </section>
  );
};
