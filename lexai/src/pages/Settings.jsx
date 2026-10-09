import { useState } from "react";
import {
  Check,
  CircleHelp,
  Cloud,
  Save,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";

const initialPolicies = [
  { label: "Flag liability caps below the configured threshold", enabled: true },
  { label: "Require data protection clause", enabled: true },
  { label: "Flag termination periods under 60 days", enabled: true },
  { label: "Review intellectual property assignment", enabled: false },
];

const initialIntegrations = [
  { name: "Google Drive", description: "Import and sync documents", connected: false },
  { name: "Microsoft SharePoint", description: "Connect your team workspace", connected: false },
  { name: "Dropbox", description: "Import files from Dropbox", connected: false },
];

export default function Settings() {
  const [provider, setProvider] = useState("LexAI Standard");
  const [ocrProvider, setOcrProvider] = useState("Built-in OCR");
  const [threshold, setThreshold] = useState(85);
  const [policies, setPolicies] = useState(initialPolicies);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [saveMessage, setSaveMessage] = useState("");

  const saveSettings = (event) => {
    event.preventDefault();
    setSaveMessage("Changes saved in this UI preview.");
    window.setTimeout(() => setSaveMessage(""), 3500);
  };

  const togglePolicy = (index) => {
    setPolicies((currentPolicies) =>
      currentPolicies.map((policy, policyIndex) =>
        policyIndex === index
          ? { ...policy, enabled: !policy.enabled }
          : policy
      )
    );
    setSaveMessage("");
  };

  const toggleIntegration = (integrationName) => {
    setIntegrations((currentIntegrations) =>
      currentIntegrations.map((integration) =>
        integration.name === integrationName
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-description">
            Configure AI analysis and workspace preferences
          </p>
        </div>
      </div>

      <form onSubmit={saveSettings}>
        <div className="settings-grid">
          <section className="panel settings-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Settings2 size={15} />
                AI configuration
              </div>
            </div>
            <div className="settings-panel-body">
              <label className="settings-field">
                <span>AI analysis model</span>
                <select
                  value={provider}
                  onChange={(event) => {
                    setProvider(event.target.value);
                    setSaveMessage("");
                  }}
                >
                  <option>LexAI Standard</option>
                  <option>LexAI High Accuracy</option>
                  <option>Manual review only</option>
                </select>
              </label>
              <label className="settings-field">
                <span>OCR provider</span>
                <select
                  value={ocrProvider}
                  onChange={(event) => {
                    setOcrProvider(event.target.value);
                    setSaveMessage("");
                  }}
                >
                  <option>Built-in OCR</option>
                  <option>High accuracy OCR</option>
                </select>
              </label>
              <label className="settings-field threshold-field">
                <span>
                  Minimum confidence <strong>{threshold}%</strong>
                </span>
                <input
                  max="100"
                  min="50"
                  onChange={(event) => {
                    setThreshold(Number(event.target.value));
                    setSaveMessage("");
                  }}
                  type="range"
                  value={threshold}
                />
                <small>Findings below this confidence will be marked for review.</small>
              </label>
            </div>
          </section>

          <section className="panel settings-panel">
            <div className="panel-header">
              <div className="panel-title">
                <ShieldCheck size={15} />
                Risk policies
              </div>
            </div>
            <div className="settings-panel-body">
              {policies.map((policy, index) => (
                <label className="policy-toggle" key={policy.label}>
                  <span>{policy.label}</span>
                  <input
                    checked={policy.enabled}
                    onChange={() => togglePolicy(index)}
                    type="checkbox"
                  />
                  <span className="toggle-track" aria-hidden="true"></span>
                </label>
              ))}
            </div>
          </section>

          <section className="panel settings-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Cloud size={15} />
                Integrations
              </div>
            </div>
            <div className="settings-panel-body">
              {integrations.map((integration) => (
                <div className="integration-row" key={integration.name}>
                  <div className="integration-mark">
                    {integration.name.slice(0, 1)}
                  </div>
                  <div className="integration-copy">
                    <strong>{integration.name}</strong>
                    <span>{integration.description}</span>
                  </div>
                  <button
                    className={`integration-button ${integration.connected ? "connected" : ""}`}
                    onClick={() => toggleIntegration(integration.name)}
                    type="button"
                  >
                    {integration.connected ? (
                      <>
                        <Check size={14} /> Connected
                      </>
                    ) : (
                      "Connect"
                    )}
                  </button>
                </div>
              ))}
              <p className="settings-footnote">
                Connections are a UI preview and are not linked to an account yet.
              </p>
            </div>
          </section>

          <section className="panel settings-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Users size={15} />
                Workspace access
              </div>
            </div>
            <div className="settings-panel-body">
              <div className="workspace-user">
                <div className="user-avatar">V</div>
                <div className="integration-copy">
                  <strong>Workspace owner</strong>
                  <span>Admin · Full access</span>
                </div>
                <span className="badge processing">You</span>
              </div>
              <div className="access-note">
                <CircleHelp size={15} />
                User invitations and role management will be available when
                workspace accounts are connected.
              </div>
            </div>
          </section>
        </div>

        <div className="settings-actions">
          {saveMessage && (
            <span className="settings-save-message" role="status">
              <Check size={15} />
              {saveMessage}
            </span>
          )}
          <button className="primary-button" type="submit">
            <Save size={16} />
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
