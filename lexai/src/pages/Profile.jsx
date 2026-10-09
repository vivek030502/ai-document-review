import { useState } from "react";
import {
  Bell,
  Check,
  KeyRound,
  LogOut,
  Mail,
  Save,
  Shield,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: "Vivek",
    lastName: "Sharma",
    email: "vivek@company.com",
    role: "Workspace administrator",
    timezone: "Asia/Kolkata",
  });
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  const updateField = (field, value) => {
    setProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
    setSaveMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaveMessage("Profile changes saved in this UI preview.");
    window.setTimeout(() => setSaveMessage(""), 3500);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My profile</h1>
          <p className="page-description">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <div className="profile-layout">
        <aside className="panel profile-summary">
          <div className="profile-avatar">VS</div>
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p>{profile.role}</p>
          <span className="profile-email"><Mail size={14} /> {profile.email}</span>
          <div className="profile-summary-divider"></div>
          <div className="profile-workspace">
            <span className="profile-workspace-mark">L</span>
            <span><strong>LexAI workspace</strong><small>Administrator</small></span>
          </div>
        </aside>

        <form className="profile-form" onSubmit={handleSubmit}>
          <section className="panel settings-panel">
            <div className="panel-header">
              <div className="panel-title"><UserRound size={15} /> Personal information</div>
            </div>
            <div className="profile-fields">
              <label className="settings-field">
                <span>First name</span>
                <input
                  autoComplete="given-name"
                  onChange={(event) => updateField("firstName", event.target.value)}
                  required
                  value={profile.firstName}
                />
              </label>
              <label className="settings-field">
                <span>Last name</span>
                <input
                  autoComplete="family-name"
                  onChange={(event) => updateField("lastName", event.target.value)}
                  required
                  value={profile.lastName}
                />
              </label>
              <label className="settings-field profile-full-field">
                <span>Email address</span>
                <input
                  autoComplete="email"
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                  type="email"
                  value={profile.email}
                />
              </label>
              <label className="settings-field profile-full-field">
                <span>Role</span>
                <input
                  onChange={(event) => updateField("role", event.target.value)}
                  value={profile.role}
                />
              </label>
              <label className="settings-field profile-full-field">
                <span>Time zone</span>
                <select
                  onChange={(event) => updateField("timezone", event.target.value)}
                  value={profile.timezone}
                >
                  <option value="Asia/Kolkata">India Standard Time (UTC+05:30)</option>
                  <option value="America/New_York">Eastern Time (UTC-05:00)</option>
                  <option value="Europe/London">United Kingdom Time (UTC+00:00)</option>
                  <option value="America/Los_Angeles">Pacific Time (UTC-08:00)</option>
                </select>
              </label>
            </div>
          </section>

          <section className="panel settings-panel profile-preferences">
            <div className="panel-header">
              <div className="panel-title"><Bell size={15} /> Notifications</div>
            </div>
            <div className="settings-panel-body">
              <PreferenceToggle
                checked={emailUpdates}
                description="Receive updates about document analysis and reports."
                label="Workspace updates"
                onChange={() => setEmailUpdates((enabled) => !enabled)}
              />
              <PreferenceToggle
                checked={securityAlerts}
                description="Get notified about important account and security activity."
                label="Security alerts"
                onChange={() => setSecurityAlerts((enabled) => !enabled)}
              />
            </div>
          </section>

          <section className="panel settings-panel profile-security">
            <div className="panel-header">
              <div className="panel-title"><Shield size={15} /> Account security</div>
            </div>
            <div className="profile-security-row">
              <span className="security-icon"><KeyRound size={17} /></span>
              <span><strong>Password</strong><small>Keep your account secure with a strong password.</small></span>
              <span className="security-preview-label">Backend required</span>
            </div>
          </section>

          <div className="settings-actions">
            {saveMessage && (
              <span className="settings-save-message" role="status">
                <Check size={15} /> {saveMessage}
              </span>
            )}
            <Link className="secondary-button profile-logout" to="/logout">
              <LogOut size={15} /> Sign out
            </Link>
            <button className="primary-button" type="submit">
              <Save size={16} /> Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PreferenceToggle({ checked, description, label, onChange }) {
  return (
    <label className="policy-toggle preference-toggle">
      <span className="preference-copy">
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input checked={checked} onChange={onChange} type="checkbox" />
      <span className="toggle-track" aria-hidden="true"></span>
    </label>
  );
}
