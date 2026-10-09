import { CheckCircle2, LogIn, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <main className="auth-page logout-page">
      <section className="auth-brand-panel">
        <Link className="marketing-brand" to="/">
          <span className="marketing-brand-mark">L</span>
          <span>LexAI</span>
        </Link>
        <div className="auth-brand-content">
          <span className="eyebrow"><ShieldCheck size={14} /> YOUR WORKSPACE, PROTECTED</span>
          <h1>Until next<br /><span>time.</span></h1>
          <p>
            Your next document review will be here when you’re ready. Thanks
            for using LexAI.
          </p>
        </div>
        <span className="auth-panel-caption">Legal intelligence for clearer decisions.</span>
      </section>
      <section className="auth-form-panel">
        <div className="logout-confirmation">
          <span className="logout-icon"><CheckCircle2 size={28} /></span>
          <span className="auth-form-kicker">SIGNED OUT</span>
          <h2>You’re signed out</h2>
          <p>
            You have safely left the LexAI demo workspace. Sign in again when
            you’re ready to continue.
          </p>
          <Link className="primary-button logout-signin" to="/login">
            <LogIn size={16} /> Sign in again
          </Link>
          <Link className="logout-home-link" to="/">
            Return to home
          </Link>
          <p className="auth-demo-note">
            This is a UI preview; session management will be added with the
            authentication backend.
          </p>
        </div>
      </section>
    </main>
  );
}
