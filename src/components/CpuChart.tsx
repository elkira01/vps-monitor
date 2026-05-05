"use client";

import { Line } from "react-chartjs-2";
import "@/lib/chart";
import { MAX_POINTS, badgeClass, badgeText } from "@/lib/helpers";

interface CpuChartProps {
  cpuHistory: number[];
  cpu: number;
}

export default function CpuChart({ cpuHistory, cpu }: CpuChartProps) {
  const chartData = {
    labels: Array(MAX_POINTS).fill(""),
    datasets: [
      {
        data: cpuHistory.map((v) => (isNaN(v) ? null : v)),
        borderColor: "#00e87a",
        borderWidth: 2,
        backgroundColor: "rgba(0,232,122,0.07)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        spanGaps: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false as const,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: {
        min: 0,
        max: 100,
        grid: { color: "#1e2a34", lineWidth: 1 },
        border: { color: "#1e2a34" },
        ticks: {
          color: "#4a6070",
          font: { family: "JetBrains Mono", size: 10 },
          callback: (v: string | number) => v + "%",
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <div className="rounded-md border border-border bg-bg2 p-3 md:p-4">
      <div className="mb-3.5 flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-muted">
        CPU history
        <span className={badgeClass(cpu)}>{badgeText(cpu)}</span>
      </div>
      <div className="relative h-[100px] min-[480px]:h-[120px] md:h-[140px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
