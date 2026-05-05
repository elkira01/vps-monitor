export const MAX_POINTS = 60;

export const fmt = {
  pct: (v: number) => Math.round(v),
  mb: (v: number) =>
    v < 1024 ? v.toFixed(0) + " MB" : (v / 1024).toFixed(1) + " GB",
  kbToStr: (kb: number) =>
    kb < 1024
      ? kb.toFixed(0) + " KB"
      : kb < 1048576
        ? (kb / 1024).toFixed(0) + " MB"
        : (kb / 1048576).toFixed(1) + " GB",
  bps: (b: number) =>
    b < 1024
      ? b.toFixed(0) + " B/s"
      : b < 1048576
        ? (b / 1024).toFixed(1) + " KB/s"
        : (b / 1048576).toFixed(2) + " MB/s",
  uptime: (s: number) => {
    const d = Math.floor(s / 86400),
      h = Math.floor((s % 86400) / 3600),
      m = Math.floor((s % 3600) / 60);
    if (d) return d + "d " + h + "h " + m + "m";
    if (h) return h + "h " + m + "m";
    return m + "m";
  },
  ts: () => new Date().toLocaleTimeString(),
};

export function barClass(pct: number) {
  if (pct > 85) return "bg-red";
  if (pct > 65) return "bg-amber";
  return "bg-green";
}

export function badgeClass(pct: number) {
  const base =
    "rounded-[3px] border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.05em] md:px-2 md:py-[3px] md:text-[10px]";
  if (pct > 85) return `${base} border-red/25 bg-red/15 text-red`;
  if (pct > 65) return `${base} border-amber/25 bg-amber/15 text-amber`;
  return `${base} border-green/25 bg-green/15 text-green`;
}

export function badgeText(pct: number) {
  if (pct > 85) return "HIGH";
  if (pct > 65) return "MED";
  return "LOW";
}
