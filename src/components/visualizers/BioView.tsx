export const BioView = ({ isotope }: { isotope: { expected: string; actual: string } }) => (
  <div className="viz-box">Bio Isotope: expected={isotope.expected} / actual={isotope.actual}</div>
);
