"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "vps-monitor-endpoints";

export function useEndpointHistory() {
  const [endpoints, setEndpoints] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setEndpoints(JSON.parse(stored));
    } catch {}
  }, []);

  const saveEndpoint = useCallback((url: string) => {
    setEndpoints((prev) => {
      const next = [url, ...prev.filter((e) => e !== url)];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const removeEndpoint = useCallback((url: string) => {
    setEndpoints((prev) => {
      const next = prev.filter((e) => e !== url);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return { endpoints, saveEndpoint, removeEndpoint };
}
