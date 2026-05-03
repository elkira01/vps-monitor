"use client";

interface SetupScreenProps {
  setupUrl: string;
  setSetupUrl: (v: string) => void;
  onConnect: () => void;
}

export default function SetupScreen({
  setupUrl,
  setSetupUrl,
  onConnect,
}: SetupScreenProps) {
  return (
    <div className="setup">
      <div className="setup-box">
        <h2>Connect to your VPS</h2>
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
