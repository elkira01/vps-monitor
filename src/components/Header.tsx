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
const selectClass =
  "cursor-pointer rounded border border-border bg-bg3 px-2 py-1.5 font-mono text-xs text-text outline-none";
const removeButtonClass =
  "cursor-pointer rounded border border-border bg-transparent px-2 py-1 text-[11px] text-muted transition-colors hover:border-red hover:text-red";
const connectButtonClass =
  "min-w-20 flex-1 cursor-pointer rounded bg-green px-3 py-1.5 font-mono text-[11px] font-bold text-black transition-opacity hover:opacity-85 md:flex-none md:px-3.5 md:text-xs";

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
    <header className="flex flex-wrap items-center gap-3 border-b border-border bg-bg2 px-4 py-3 md:flex-nowrap md:gap-4 md:px-6 md:py-3.5">
      <span className="text-sm font-bold tracking-[0.06em] text-green md:text-[15px]">
        VPS<span className="font-normal text-muted">/</span>MONITOR
      </span>
      <div
        className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
          connected
            ? "bg-green shadow-[0_0_6px_#00e87a]"
            : errorMsg
              ? "bg-red shadow-[0_0_6px_#ff4c6a]"
              : "bg-muted"
        }`}
      />
      <span className="text-xs text-muted">
        {connected
          ? "connected"
          : errorMsg
            ? "error: " + errorMsg
            : "disconnected"}
      </span>
      <div className="mt-2 flex w-full flex-wrap items-center gap-1 md:ml-auto md:mt-0 md:w-auto md:gap-2">
        <select
          className={`${selectClass} w-auto`}
          value={interval}
          onChange={(e) => setIntervalVal(Number(e.target.value))}
        >
          <option value={1000}>1 s</option>
          <option value={2000}>2 s</option>
          <option value={5000}>5 s</option>
        </select>
        <select
          className={`${selectClass} w-full max-w-none md:w-auto md:max-w-[220px]`}
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
            className="w-full rounded border border-border bg-bg3 px-3 py-1.5 font-mono text-xs text-texthi outline-none transition-colors focus:border-green md:w-[200px]"
            placeholder="http://VPS_IP:9999"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNewConnect()}
            autoFocus
          />
        )}
        {endpoints.length > 0 && !showNewInput && urlInput && (
          <button
            className={removeButtonClass}
            title="Remove saved endpoint"
            onClick={() => {
              removeEndpoint(urlInput);
              setUrlInput("");
            }}
          >
            ✕
          </button>
        )}
        <button
          className={connectButtonClass}
          onClick={showNewInput ? handleNewConnect : onConnect}
        >
          Connect
        </button>
      </div>
    </header>
  );
}
