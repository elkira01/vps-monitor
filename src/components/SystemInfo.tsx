"use client";

import { fmt } from "@/lib/helpers";
import { VpsData } from "@/lib/types";

interface SystemInfoProps {
  data: VpsData;
}

export default function SystemInfo({ data }: SystemInfoProps) {
  const mem = data.memory;
  const disk = data.disk;

  return (
    <div className="panel">
      <div className="panel-title">System info</div>
      <div className="stat-list">
        <div className="stat-row">
          <span className="stat-key">Hostname</span>
          <span className="stat-val">{data.hostname || "—"}</span>
        </div>
        <div className="stat-row">
          <span className="stat-key">CPU cores</span>
          <span className="stat-val">{data.cpus}</span>
        </div>
        <div className="stat-row">
          <span className="stat-key">Total RAM</span>
          <span className="stat-val">{fmt.kbToStr(mem.total)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-key">Total Disk</span>
          <span className="stat-val">{fmt.kbToStr(disk.total)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-key">Swap size</span>
          <span className="stat-val">
            {mem.swap_total > 0 ? fmt.kbToStr(mem.swap_total) : "none"}
          </span>
        </div>
        <div className="stat-row">
          <span className="stat-key">Cached</span>
          <span className="stat-val">{fmt.kbToStr(mem.cached)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-key">Buffers</span>
          <span className="stat-val">{fmt.kbToStr(mem.buffers)}</span>
        </div>
      </div>
    </div>
  );
}
