"use client";

import { VpsData } from "@/lib/types";
import { fmt, badgeClass } from "@/lib/helpers";
import MetricCard from "./MetricCard";
import CpuChart from "./CpuChart";
import LoadAverage from "./LoadAverage";
import NetworkPanel from "./NetworkPanel";
import SystemInfo from "./SystemInfo";

interface DashboardProps {
  data: VpsData;
  connected: boolean;
  cpuHistory: number[];
  lastMaxRx: number;
  lastMaxTx: number;
}

export default function Dashboard({
  data,
  connected,
  cpuHistory,
  lastMaxRx,
  lastMaxTx,
}: DashboardProps) {
  const cpu = data.cpu;
  const mem = data.memory;
  const disk = data.disk;
  const load = data.load;
  const cpus = data.cpus;

  const ramPct = Math.round((mem.used / mem.total) * 100);
  const swapPct =
    mem.swap_total > 0 ? Math.round((mem.swap_used / mem.swap_total) * 100) : 0;
  const diskPct = Math.round((disk.used / disk.total) * 100);

  return (
    <div className="px-3 py-3 md:px-6 md:py-5">
      <div className="mb-4 flex flex-col items-start gap-2 border-b border-border pb-3.5 md:mb-4.5 md:flex-row md:items-center md:gap-3">
        <span className="text-[15px] font-bold text-texthi">
          {data.hostname || "—"}
        </span>
        <span className="text-[11px] text-muted">
          {cpus} vCPU{cpus > 1 ? "s" : ""}
        </span>
        <span className={badgeClass(cpu)}>
          {connected ? "LIVE" : "OFF"}
        </span>
        <span className="text-[11px] text-muted md:ml-auto">
          updated {fmt.ts()}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 md:grid-cols-4 md:gap-3">
        <MetricCard label="CPU usage" value={cpu} sub={`load ${load[0].toFixed(2)}`} />
        <MetricCard
          label="Memory"
          value={ramPct}
          sub={`${fmt.kbToStr(mem.used)} used of ${fmt.kbToStr(mem.total)}`}
        />
        <MetricCard
          label="Swap"
          value={swapPct}
          sub={
            mem.swap_total > 0
              ? `${fmt.kbToStr(mem.swap_used)} used of ${fmt.kbToStr(mem.swap_total)}`
              : "no swap configured"
          }
        />
        <MetricCard
          label="Disk /"
          value={diskPct}
          sub={`${fmt.kbToStr(disk.used)} used of ${fmt.kbToStr(disk.total)}`}
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
        <CpuChart cpuHistory={cpuHistory} cpu={cpu} />
        <LoadAverage load={load} cpus={cpus} uptime={data.uptime} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <NetworkPanel data={data} lastMaxRx={lastMaxRx} lastMaxTx={lastMaxTx} />
        <SystemInfo data={data} />
      </div>

      <div className="px-0 pb-1 pt-2 text-right text-[10px] text-dim">
        last poll: {new Date(data.ts * 1000).toLocaleTimeString()}
      </div>
    </div>
  );
}
