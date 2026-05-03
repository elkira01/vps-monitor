"use client";

interface SetupScreenProps {
  setupUrl: string;
  setSetupUrl: (v: string) => void;
  endpoints: string[];
  removeEndpoint: (url: string) => void;
  onConnect: () => void;
}

export default function SetupScreen({
  setupUrl,
  setSetupUrl,
  endpoints,
  removeEndpoint,
  onConnect,
}: SetupScreenProps) {
  return (
    <div className="setup">
      <div className="setup-box">
        <h2>Connect to your VPS</h2>
        {endpoints.length > 0 && (
          <div className="saved-endpoints">
            <label>Saved endpoints</label>
            <div className="saved-list">
              {endpoints.map((ep) => (
                <div className="saved-row" key={ep}>
                  <button
                    className="saved-ep-btn"
                    onClick={() => {
                      setSetupUrl(ep);
                      onConnect();
                    }}
                  >
                    {ep}
                  </button>
                  <button
                    className="saved-remove-btn"
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
          <label>Agent endpoint URL</label>
          <input
            type="text"
            placeholder="http://123.456.78.90:9999"
            value={setupUrl}
            onChange={(e) => setSetupUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onConnect()}
          />
        </div>
        <button onClick={onConnect}>Connect →</button>
        <div className="hint">
          First run the agent on your VPS:
          <br />
          <code>python3 vps_monitor_agent.py</code>
          <br />
          <br />
          Open the firewall port (if needed):
          <br />
          <code>ufw allow 9999/tcp</code>
        </div>
      </div>
    </div>
  );
}
