"use client";

interface HeaderProps {
  connected: boolean;
  errorMsg: string;
  urlInput: string;
  setUrlInput: (v: string) => void;
  interval: number;
  setIntervalVal: (v: number) => void;
  onConnect: () => void;
}

export default function Header({
  connected,
  errorMsg,
  urlInput,
  setUrlInput,
  interval,
  setIntervalVal,
  onConnect,
}: HeaderProps) {
  return (
    <header>
      <span className="logo">
        VPS<span>/</span>MONITOR
      </span>
      <div className={`dot ${connected ? "ok" : errorMsg ? "err" : ""}`} />
      <span className="status-text">
        {connected
          ? "connected"
          : errorMsg
            ? "error: " + errorMsg
            : "disconnected"}
      </span>
      <div className="endpoint-wrap">
        <select
          className="interval-sel"
          value={interval}
          onChange={(e) => setIntervalVal(Number(e.target.value))}
        >
          <option value={1000}>1 s</option>
          <option value={2000}>2 s</option>
          <option value={5000}>5 s</option>
        </select>
        <input
          type="text"
          placeholder="http://YOUR_VPS_IP:9999"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onConnect()}
        />
        <button onClick={onConnect}>Connect</button>
      </div>
    </header>
  );
}
