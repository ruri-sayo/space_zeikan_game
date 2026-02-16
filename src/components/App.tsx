import { AppShell } from '@/components/layout/AppShell';
import { loadAllCases } from '@/data/caseLoader';

const cases = loadAllCases();

export const App = () => <AppShell cases={cases} />;
