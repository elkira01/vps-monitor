"use client";

import { barClass } from "@/lib/helpers";

interface MetricCardProps {
  label: string;
  value: number;
  sub: string;
}

export default function MetricCard({ label, value, sub }: MetricCardProps) {
  return (
    <div className="rounded-md border border-border bg-bg2 px-3 py-2.5 md:px-4 md:py-3.5">
      <div className="mb-2 text-[10px] uppercase tracking-[0.08em] text-muted">
        {label}
      </div>
      <div className="mb-2.5 text-xl font-bold leading-none text-texthi md:text-[26px]">
        {Math.round(value)}
        <span className="ml-0.5 text-[13px] font-normal text-muted">%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-sm bg-dim">
        <div
          className={`h-full rounded-sm transition-[width,background-color] duration-500 ease-out ${barClass(value)}`}
          style={{ width: value + "%" }}
        />
      </div>
      <div className="mt-1.5 text-[10px] text-muted">{sub}</div>
    </div>
  );
}
