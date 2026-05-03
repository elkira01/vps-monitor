export interface VpsData {
  hostname: string;
  cpus: number;
  uptime: number;
  ts: number;
  cpu: number;
  memory: {
    total: number;
    used: number;
    swap_total: number;
    swap_used: number;
    cached: number;
    buffers: number;
  };
  disk: { total: number; used: number };
  load: [number, number, number];
  network: {
    interfaces: Record<
      string,
      { rx_bytes: number; tx_bytes: number; rx_rate: number; tx_rate: number }
    >;
  };
}
