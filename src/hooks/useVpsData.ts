"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { VpsData } from "@/lib/types";
import { MAX_POINTS } from "@/lib/helpers";
import { useEndpointHistory } from "./useEndpointHistory";

export function useVpsData() {
  const [connected, setConnected] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState<VpsData | null>(null);
  const [endpoint, setEndpoint] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [setupUrl, setSetupUrl] = useState("");
  const [interval, setIntervalVal] = useState(2000);
  const { endpoints, saveEndpoint, removeEndpoint } = useEndpointHistory();
  const [cpuHistory, setCpuHistory] = useState<number[]>(
    Array(MAX_POINTS).fill(NaN)
  );
  const [lastMaxRx, setLastMaxRx] = useState(1);
  const [lastMaxTx, setLastMaxTx] = useState(1);

  const timerRef = useRef<ReturnType<typeof globalThis.setInterval> | null>(
    null
  );

  const fetchData = useCallback(async (ep: string) => {
    try {
      const res = await fetch(ep, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const d: VpsData = await res.json();
      setData(d);
      setConnected(true);
      setErrorMsg("");

      setCpuHistory((prev) => {
        const next = [...prev.slice(1), d.cpu];
        return next;
      });

      let maxRx = 1,
        maxTx = 1;
      Object.values(d.network.interfaces).forEach((iface) => {
        if (iface.rx_rate > maxRx) maxRx = iface.rx_rate;
        if (iface.tx_rate > maxTx) maxTx = iface.tx_rate;
      });
      setLastMaxRx((prev) => Math.max(1024, Math.max(prev, maxRx) * 0.98));
      setLastMaxTx((prev) => Math.max(1024, Math.max(prev, maxTx) * 0.98));
    } catch (e: unknown) {
      setConnected(false);
      setErrorMsg(e instanceof Error ? e.message : "unknown error");
    }
  }, []);

  const startPolling = useCallback(
    (ep: string, iv: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setEndpoint(ep);
      fetchData(ep);
      timerRef.current = globalThis.setInterval(() => fetchData(ep), iv);
    },
    [fetchData]
  );

  const connect = useCallback(() => {
    const u = urlInput.trim().replace(/\/$/, "");
    if (!u) return;
    saveEndpoint(u);
    startPolling(u, interval);
  }, [urlInput, interval, startPolling, saveEndpoint]);

  const connectFromSetup = useCallback(() => {
    const u = setupUrl.trim().replace(/\/$/, "");
    if (!u) return;
    setUrlInput(u);
    saveEndpoint(u);
    startPolling(u, interval);
  }, [setupUrl, interval, startPolling, saveEndpoint]);

  useEffect(() => {
    if (endpoint) {
      startPolling(endpoint, interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    connected,
    errorMsg,
    data,
    urlInput,
    setUrlInput,
    setupUrl,
    setSetupUrl,
    interval,
    setIntervalVal,
    cpuHistory,
    lastMaxRx,
    lastMaxTx,
    endpoints,
    removeEndpoint,
    connect,
    connectFromSetup,
  };
}
