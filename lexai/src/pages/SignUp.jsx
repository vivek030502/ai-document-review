import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
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
          <span className="eyebrow"><span></span> A CLEARER WAY TO REVIEW</span>
          <h1>Make room for<br /><span>better decisions.</span></h1>
          <p>
            Create your workspace to organize agreements, explore findings,
            and bring clarity to your legal document reviews.
          </p>
          <div className="auth-brand-points">
            <span><span>01</span> Keep important documents together</span>
            <span><span>02</span> Find key terms and potential risks</span>
            <span><span>03</span> Keep people in control of decisions</span>
          </div>
        </div>
        <span className="auth-panel-caption">AI-assisted insights. Human-led decisions.</span>
      </section>

      <section className="auth-form-panel">
        <Link className="auth-back-link" to="/">
          <ArrowLeft size={15} /> Back to home
        </Link>
        <div className="auth-form-wrap">
          <span className="auth-form-kicker">GET STARTED</span>
          <h2>Create your account</h2>
          <p className="auth-form-description">
            Set up your LexAI workspace in just a few steps.
          </p>

          <form className="auth-form signup-form" onSubmit={handleSubmit}>
            <div className="signup-name-fields">
              <label className="auth-field">
                <span>First name</span>
                <span className="auth-input-wrap">
                  <UserRound size={16} />
                  <input
                    autoComplete="given-name"
                    name="given-name"
                    placeholder="First name"
                    required
                  />
                </span>
              </label>
              <label className="auth-field">
                <span>Last name</span>
                <span className="auth-input-wrap">
                  <input
                    autoComplete="family-name"
                    name="family-name"
                    placeholder="Last name"
                    required
                  />
                </span>
              </label>
            </div>

            <label className="auth-field">
              <span>Work email</span>
              <span className="auth-input-wrap">
                <Mail size={17} />
                <input
                  autoComplete="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
              </span>
            </label>

            <label className="auth-field">
              <span>Create password</span>
              <span className="auth-input-wrap">
                <LockKeyhole size={17} />
                <input
                  autoComplete="new-password"
                  minLength="8"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError("");
                  }}
                  placeholder="At least 8 characters"
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

            <label className="auth-field">
              <span>Confirm password</span>
              <span className="auth-input-wrap">
                <LockKeyhole size={17} />
                <input
                  autoComplete="new-password"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Re-enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                />
              </span>
              {passwordError && (
                <span className="auth-field-error" role="alert">
                  {passwordError}
                </span>
              )}
            </label>

            <label className="auth-remember signup-terms">
              <input required type="checkbox" />
              <span>
                I agree to the <a href="#terms">Terms of Service</a> and{" "}
                <a href="#privacy">Privacy Policy</a>.
              </span>
            </label>

            <button className="primary-button auth-submit" type="submit">
              Create account
            </button>
          </form>

          <p className="auth-demo-note">
            UI preview: account details are not saved until a backend is connected.
          </p>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
        <span className="auth-legal-note">
          By creating an account, you agree to our <a href="#terms">Terms</a> and{" "}
          <a href="#privacy">Privacy Policy</a>.
        </span>
      </section>
    </main>
  );
}
