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
    <div className="panel">
      <div className="panel-title">
        CPU history
        <span className={badgeClass(cpu)}>{badgeText(cpu)}</span>
      </div>
      <div className="chart-wrap">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
