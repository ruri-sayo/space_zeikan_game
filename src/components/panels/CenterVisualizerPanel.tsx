import type { CaseData } from '@/types/case';
import { useAuditStore } from '@/stores/auditStore';
import { HullView } from '@/components/visualizers/HullView';
import { OrbitView } from '@/components/visualizers/OrbitView';
import { SignalView } from '@/components/visualizers/SignalView';
import { BioView } from '@/components/visualizers/BioView';

export const CenterVisualizerPanel = ({ caseData }: { caseData: CaseData }) => {
  const { uiTab, setTab } = useAuditStore();
  return (
    <section className="panel">
      <h2>Visualizer</h2>
      <div className="tabs">
        {(['Hull', 'Orbit', 'Signal', 'Bio'] as const).map((tab) => (
          <button key={tab} className={uiTab === tab ? 'active' : ''} onClick={() => setTab(tab)}>{tab}</button>
        ))}
      </div>
      {uiTab === 'Hull' && <HullView />}
      {uiTab === 'Orbit' && (
        <OrbitView expectedDv={caseData.telemetry.orbit.expectedDv} actualDv={caseData.telemetry.orbit.actualDv} />
      )}
      {uiTab === 'Signal' && <SignalView peaks={caseData.telemetry.vibration.peaksHz} />}
      {uiTab === 'Bio' && <BioView isotope={caseData.bio.isotope} />}
    </section>
  );
};
