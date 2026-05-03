"use client";

import { fmt } from "@/lib/helpers";

interface LoadAverageProps {
  load: [number, number, number];
  cpus: number;
  uptime: number;
}

export default function LoadAverage({ load, cpus, uptime }: LoadAverageProps) {
  return (
    <div className="panel">
      <div className="panel-title">Load average</div>
      {[
        { label: "1 min", val: load[0] },
        { label: "5 min", val: load[1] },
        { label: "15 min", val: load[2] },
      ].map(({ label, val }) => {
        const pct = Math.min(100, (val / (cpus * 2)) * 100);
        return (
          <div className="load-row" key={label}>
            <div className="load-label">{label}</div>
            <div className="load-track">
              <div
                className="load-bar"
                style={{ width: pct + "%" }}
              />
            </div>
            <div className="load-val">{val.toFixed(2)}</div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>
        <div className="uptime-big">{fmt.uptime(uptime)}</div>
        <div className="uptime-sub">uptime</div>
      </div>
    </div>
  );
}
