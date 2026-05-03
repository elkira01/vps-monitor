"use client";

import { barColor } from "@/lib/helpers";

interface MetricCardProps {
  label: string;
  value: number;
  sub: string;
}

export default function MetricCard({ label, value, sub }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {Math.round(value)}
        <span className="unit">%</span>
      </div>
      <div className="pbar-track">
        <div
          className="pbar-fill"
          style={{
            width: value + "%",
            background: barColor(value),
          }}
        />
      </div>
      <div className="metric-sub">{sub}</div>
    </div>
  );
}
