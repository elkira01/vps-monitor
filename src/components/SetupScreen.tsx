"use client";

interface SetupScreenProps {
  setupUrl: string;
  setSetupUrl: (v: string) => void;
  endpoints: string[];
  removeEndpoint: (url: string) => void;
  onConnect: () => void;
}

const inputClass =
  "w-full rounded border border-border bg-bg3 px-3 py-[9px] font-mono text-[13px] text-texthi outline-none transition-colors focus:border-green";

export default function SetupScreen({
  setupUrl,
  setSetupUrl,
  endpoints,
  removeEndpoint,
  onConnect,
}: SetupScreenProps) {
  return (
    <div className="flex min-h-[calc(100vh-53px)] flex-col items-center justify-center gap-3 px-4">
      <div className="flex w-full max-w-[400px] flex-col gap-3.5 rounded-lg border border-border bg-bg2 px-5 py-4 md:max-w-[440px] md:px-8 md:py-7">
        <h2 className="mb-1 text-base text-texthi md:text-lg">Connect to your VPS</h2>
        {endpoints.length > 0 && (
          <div className="mb-1">
            <label className="text-[11px] uppercase tracking-[0.06em] text-muted">
              Saved endpoints
            </label>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {endpoints.map((ep) => (
                <div className="flex items-center gap-1.5" key={ep}>
                  <button
                    className="flex-1 cursor-pointer rounded border border-border bg-bg3 px-2.5 py-[7px] text-left font-mono text-xs text-texthi transition-colors hover:border-green"
                    onClick={() => {
                      setSetupUrl(ep);
                      onConnect();
                    }}
                  >
                    {ep}
                  </button>
                  <button
                    className="cursor-pointer rounded border border-border bg-transparent px-2 py-1.5 text-[11px] text-muted transition-colors hover:border-red hover:text-red"
                    title="Remove"
                    onClick={() => removeEndpoint(ep)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <label className="text-[11px] uppercase tracking-[0.06em] text-muted">
            Agent endpoint URL
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="http://123.456.78.90:9999"
            value={setupUrl}
            onChange={(e) => setSetupUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onConnect()}
          />
        </div>
        <button
          className="mt-1 w-full cursor-pointer rounded bg-green p-2.5 font-mono text-[13px] font-bold text-black"
          onClick={onConnect}
        >
          Connect →
        </button>
        <div className="rounded border border-border bg-bg3 px-3.5 py-2.5 text-[11px] leading-[1.8] text-muted">
          First run the agent on your VPS:
          <br />
          <code className="rounded-[3px] bg-green/10 px-1.5 py-px text-green">
            python3 vps_monitor_agent.py
          </code>
          <br />
          <br />
          Open the firewall port (if needed):
          <br />
          <code className="rounded-[3px] bg-green/10 px-1.5 py-px text-green">
            ufw allow 9999/tcp
          </code>
        </div>
      </div>
    </div>
  );
}
