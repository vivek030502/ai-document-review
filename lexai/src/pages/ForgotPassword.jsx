import { useState } from "react";
import { ArrowLeft, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link className="marketing-brand" to="/">
          <span className="marketing-brand-mark">L</span>
          <span>LexAI</span>
        </Link>
        <div className="auth-brand-content">
          <span className="eyebrow"><ShieldCheck size={14} /> YOUR WORKSPACE, PROTECTED</span>
          <h1>Back to your<br /><span>better view.</span></h1>
          <p>
            Your documents and review history are waiting for you. We’ll help
            you get back into your workspace.
          </p>
        </div>
        <span className="auth-panel-caption">Private by design. Clear by default.</span>
      </section>

      <section className="auth-form-panel">
        <Link className="auth-back-link" to="/login">
          <ArrowLeft size={15} /> Back to sign in
        </Link>
        <div className="auth-form-wrap">
          {submitted ? (
            <div className="reset-confirmation" role="status">
              <span className="reset-success-icon"><CheckCircle2 size={26} /></span>
              <span className="auth-form-kicker">CHECK YOUR INBOX</span>
              <h2>Look for your reset link</h2>
              <p>
                If an account is associated with <strong>{email}</strong>, you’ll
                receive instructions to reset your password.
              </p>
              <button
                className="secondary-button reset-resend"
                onClick={() => setSubmitted(false)}
                type="button"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <span className="auth-form-kicker">ACCOUNT RECOVERY</span>
              <h2>Forgot your password?</h2>
              <p className="auth-form-description">
                Enter the email address associated with your account and we’ll
                send you a reset link.
              </p>
              <form className="auth-form" onSubmit={handleSubmit}>
                <label className="auth-field">
                  <span>Work email</span>
                  <span className="auth-input-wrap">
                    <Mail size={17} />
                    <input
                      autoComplete="email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      required
                      type="email"
                      value={email}
                    />
                  </span>
                </label>
                <button className="primary-button auth-submit" type="submit">
                  Send reset link
                </button>
              </form>
              <p className="auth-demo-note">
                UI preview only: password reset emails are not sent until a
                backend is connected.
              </p>
            </>
          )}
        </div>
        <span className="auth-legal-note">
          Need help? <a href="mailto:support@lexai.example">Contact support</a>
        </span>
      </section>
    </main>
  );
}
