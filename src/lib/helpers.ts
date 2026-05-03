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

export function barColor(pct: number) {
  if (pct > 85) return "var(--red)";
  if (pct > 65) return "var(--amber)";
  return "var(--green)";
}

export function badgeClass(pct: number) {
  if (pct > 85) return "badge badge-red";
  if (pct > 65) return "badge badge-amber";
  return "badge badge-green";
}

export function badgeText(pct: number) {
  if (pct > 85) return "HIGH";
  if (pct > 65) return "MED";
  return "LOW";
}
