"use client";

import { useState } from "react";

interface HeaderProps {
  connected: boolean;
  errorMsg: string;
  urlInput: string;
  setUrlInput: (v: string) => void;
  interval: number;
  setIntervalVal: (v: number) => void;
  endpoints: string[];
  removeEndpoint: (url: string) => void;
  onConnect: () => void;
}

const NEW_VALUE = "__new__";

export default function Header({
  connected,
  errorMsg,
  urlInput,
  setUrlInput,
  interval,
  setIntervalVal,
  endpoints,
  removeEndpoint,
  onConnect,
}: HeaderProps) {
  const [showNewInput, setShowNewInput] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const selectedValue = showNewInput
    ? NEW_VALUE
    : endpoints.includes(urlInput)
      ? urlInput
      : endpoints.length > 0
        ? NEW_VALUE
        : NEW_VALUE;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === NEW_VALUE) {
      setShowNewInput(true);
      setNewUrl("");
    } else {
      setShowNewInput(false);
      setUrlInput(val);
    }
  };

  const handleNewConnect = () => {
    const u = newUrl.trim().replace(/\/$/, "");
    if (!u) return;
    setUrlInput(u);
    onConnect();
    setShowNewInput(false);
    setNewUrl("");
  };

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
        <select
          className="endpoint-sel"
          value={selectedValue}
          onChange={handleSelectChange}
        >
          {endpoints.map((ep) => (
            <option key={ep} value={ep}>
              {ep}
            </option>
          ))}
          <option value={NEW_VALUE}>+ New endpoint</option>
        </select>
        {showNewInput && (
          <input
            type="text"
            className="endpoint-new-input"
            placeholder="http://VPS_IP:9999"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNewConnect()}
            autoFocus
          />
        )}
        {endpoints.length > 0 && !showNewInput && urlInput && (
          <button
            className="endpoint-remove-btn"
            title="Remove saved endpoint"
            onClick={() => {
              removeEndpoint(urlInput);
              setUrlInput("");
            }}
          >
            ✕
          </button>
        )}
        <button onClick={showNewInput ? handleNewConnect : onConnect}>
          Connect
        </button>
      </div>
    </header>
  );
}
