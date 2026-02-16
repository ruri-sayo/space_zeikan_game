export const SignalView = ({ peaks }: { peaks: number[] }) => (
  <div className="viz-box">Signal Peaks: {peaks.join(', ')} Hz</div>
);
