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
    <div className="rounded-md border border-border bg-bg2 p-3 md:p-4">
      <div className="mb-3.5 flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-muted">
        System info
      </div>
      <div className="mt-3.5 flex flex-col gap-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted">Hostname</span>
          <span className="text-texthi">{data.hostname || "—"}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">CPU cores</span>
          <span className="text-texthi">{data.cpus}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Total RAM</span>
          <span className="text-texthi">{fmt.kbToStr(mem.total)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Total Disk</span>
          <span className="text-texthi">{fmt.kbToStr(disk.total)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Swap size</span>
          <span className="text-texthi">
            {mem.swap_total > 0 ? fmt.kbToStr(mem.swap_total) : "none"}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Cached</span>
          <span className="text-texthi">{fmt.kbToStr(mem.cached)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Buffers</span>
          <span className="text-texthi">{fmt.kbToStr(mem.buffers)}</span>
        </div>
      </div>
    </div>
  );
}
