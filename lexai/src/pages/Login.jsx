import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link className="marketing-brand" to="/">
          <span className="marketing-brand-mark">L</span>
          <span>LexAI</span>
        </Link>
        <div className="auth-brand-content">
          <span className="eyebrow"><span></span> LEGAL INTELLIGENCE, REIMAGINED</span>
          <h1>Clarity for the<br /><span>fine print.</span></h1>
          <p>
            A considered workspace for teams who want to understand their
            agreements with more confidence.
          </p>
          <div className="auth-brand-points">
            <span><span>01</span> See the terms that matter</span>
            <span><span>02</span> Surface potential risks</span>
            <span><span>03</span> Keep people in control</span>
          </div>
        </div>
        <span className="auth-panel-caption">AI-assisted insights. Human-led decisions.</span>
      </section>

      <section className="auth-form-panel">
        <Link className="auth-back-link" to="/">
          <ArrowLeft size={15} /> Back to home
        </Link>
        <div className="auth-form-wrap">
          <span className="auth-form-kicker">WELCOME BACK</span>
          <h2>Sign in to LexAI</h2>
          <p className="auth-form-description">
            Enter your details to continue to your workspace.
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
            <label className="auth-field">
              <span className="auth-password-label">
                Password
                <Link to="/forgot-password">Forgot password?</Link>
              </span>
              <span className="auth-input-wrap">
                <LockKeyhole size={17} />
                <input
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="password-visibility"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </label>
            <label className="auth-remember">
              <input type="checkbox" />
              <span>Keep me signed in</span>
            </label>
            <button className="primary-button auth-submit" type="submit">
              Sign in to workspace
            </button>
          </form>
          <p className="auth-demo-note">
            UI preview: any valid email and password will open the demo workspace.
          </p>
          <p className="auth-switch">
            New to LexAI? <Link to="/signup">Create an account</Link>
          </p>
        </div>
        <span className="auth-legal-note">
          By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.
        </span>
      </section>
    </main>
  );
}
