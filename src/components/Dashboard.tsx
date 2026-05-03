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
    <div className="dashboard">
      <div className="hostname-bar">
        <span className="hname">{data.hostname || "—"}</span>
        <span className="meta">
          {cpus} vCPU{cpus > 1 ? "s" : ""}
        </span>
        <span className={`badge ${badgeClass(cpu)}`}>
          {connected ? "LIVE" : "OFF"}
        </span>
        <span className="meta" style={{ marginLeft: "auto" }}>
          updated {fmt.ts()}
        </span>
      </div>

      <div className="metric-grid">
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

      <div className="row3">
        <CpuChart cpuHistory={cpuHistory} cpu={cpu} />
        <LoadAverage load={load} cpus={cpus} uptime={data.uptime} />
      </div>

      <div className="row2">
        <NetworkPanel data={data} lastMaxRx={lastMaxRx} lastMaxTx={lastMaxTx} />
        <SystemInfo data={data} />
      </div>

      <div className="footer">
        last poll: {new Date(data.ts * 1000).toLocaleTimeString()}
      </div>
    </div>
  );
}
