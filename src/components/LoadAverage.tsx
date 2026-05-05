"use client";

import { fmt } from "@/lib/helpers";

interface LoadAverageProps {
  load: [number, number, number];
  cpus: number;
  uptime: number;
}

export default function LoadAverage({ load, cpus, uptime }: LoadAverageProps) {
  return (
    <div className="rounded-md border border-border bg-bg2 p-3 md:p-4">
      <div className="mb-3.5 flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-muted">
        Load average
      </div>
      {[
        { label: "1 min", val: load[0] },
        { label: "5 min", val: load[1] },
        { label: "15 min", val: load[2] },
      ].map(({ label, val }) => {
        const pct = Math.min(100, (val / (cpus * 2)) * 100);
        return (
          <div className="mb-2.5 flex items-center gap-2 md:gap-2.5" key={label}>
            <div className="w-7.5 shrink-0 text-[10px] text-muted md:w-8.5 md:text-[11px]">
              {label}
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-[3px] bg-dim">
              <div
                className="h-full rounded-[3px] bg-blue transition-[width] duration-500"
                style={{ width: pct + "%" }}
              />
            </div>
            <div className="w-10 shrink-0 text-right text-[11px] text-texthi md:w-11 md:text-xs">
              {val.toFixed(2)}
            </div>
          </div>
        );
      })}
      <div className="mt-5">
        <div className="mb-1 text-2xl font-bold text-green md:text-[28px]">
          {fmt.uptime(uptime)}
        </div>
        <div className="text-[11px] text-muted">uptime</div>
      </div>
    </div>
  );
}
