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
    <div className="panel">
      <div className="panel-title">
        Network I/O
        <span style={{ display: "flex", gap: 12, fontSize: 10 }}>
          <span style={{ color: "var(--green)" }}>▲ RX</span>
          <span style={{ color: "var(--amber)" }}>▼ TX</span>
        </span>
      </div>
      {Object.keys(data.network.interfaces).length === 0 && (
        <span style={{ color: "var(--muted)" }}>no interfaces</span>
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
          <div className="net-iface" key={iface}>
            <div className="net-name">{iface}</div>
            <div className="net-row">
              <div className="net-dir">RX</div>
              <div className="net-track">
                <div
                  className="net-fill net-rx-fill"
                  style={{ width: rxPct + "%" }}
                />
              </div>
              <div className="net-bps">{fmt.bps(info.rx_rate)}</div>
            </div>
            <div className="net-row">
              <div className="net-dir">TX</div>
              <div className="net-track">
                <div
                  className="net-fill net-tx-fill"
                  style={{ width: txPct + "%" }}
                />
              </div>
              <div className="net-bps">{fmt.bps(info.tx_rate)}</div>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--muted)",
                marginTop: 4,
              }}
            >
              Total: ↑ {fmt.kbToStr(Math.round(info.rx_bytes / 1024))} / ↓{" "}
              {fmt.kbToStr(Math.round(info.tx_bytes / 1024))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
