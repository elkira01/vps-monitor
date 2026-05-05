"use client";

import { fmt } from "@/lib/helpers";
import { VpsData } from "@/lib/types";

interface NetworkPanelProps {
  data: VpsData;
  lastMaxRx: number;
  lastMaxTx: number;
}

export default function NetworkPanel({
  data,
  lastMaxRx,
  lastMaxTx,
}: NetworkPanelProps) {
  return (
    <div className="rounded-md border border-border bg-bg2 p-3 md:p-4">
      <div className="mb-3.5 flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-muted">
        Network I/O
        <span className="flex gap-3 text-[10px]">
          <span className="text-green">▲ RX</span>
          <span className="text-amber">▼ TX</span>
        </span>
      </div>
      {Object.keys(data.network.interfaces).length === 0 && (
        <span className="text-muted">no interfaces</span>
      )}
      {(
        Object.entries(data.network.interfaces) as [
          string,
          { rx_bytes: number; tx_bytes: number; rx_rate: number; tx_rate: number },
        ][]
      ).map(([iface, info]) => {
        const rxPct = Math.min(100, (info.rx_rate / lastMaxRx) * 100);
        const txPct = Math.min(100, (info.tx_rate / lastMaxTx) * 100);
        return (
          <div className="mb-3.5" key={iface}>
            <div className="mb-2 text-xs font-bold text-blue">{iface}</div>
            <div className="mb-1 flex items-center gap-2">
              <div className="w-5 text-[10px] text-muted">RX</div>
              <div className="h-1 flex-1 overflow-hidden rounded-sm bg-dim">
                <div
                  className="h-full rounded-sm bg-green transition-[width] duration-500"
                  style={{ width: rxPct + "%" }}
                />
              </div>
              <div className="w-[70px] text-right text-[10px] text-texthi md:w-20 md:text-[11px]">
                {fmt.bps(info.rx_rate)}
              </div>
            </div>
            <div className="mb-1 flex items-center gap-2">
              <div className="w-5 text-[10px] text-muted">TX</div>
              <div className="h-1 flex-1 overflow-hidden rounded-sm bg-dim">
                <div
                  className="h-full rounded-sm bg-amber transition-[width] duration-500"
                  style={{ width: txPct + "%" }}
                />
              </div>
              <div className="w-[70px] text-right text-[10px] text-texthi md:w-20 md:text-[11px]">
                {fmt.bps(info.tx_rate)}
              </div>
            </div>
            <div className="mt-1 text-[10px] text-muted">
              Total: ↑ {fmt.kbToStr(Math.round(info.rx_bytes / 1024))} / ↓{" "}
              {fmt.kbToStr(Math.round(info.tx_bytes / 1024))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
