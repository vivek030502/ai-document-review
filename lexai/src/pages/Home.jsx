import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileSearch,
  ScanText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: FileSearch,
    title: "Understand every document",
    description:
      "Find key terms, parties, dates, and obligations without reading every page line by line.",
  },
  {
    icon: ShieldCheck,
    title: "Spot risks earlier",
    description:
      "Surface unusual terms and missing protections so your team knows what deserves a closer look.",
  },
  {
    icon: ScanText,
    title: "Extract clauses instantly",
    description:
      "Turn dense agreements into an organized view of the clauses that matter to your business.",
  },
];

const analysisFindings = [
  { label: "Liability cap", status: "Needs review", tone: "warning" },
  { label: "Data protection", status: "Missing clause", tone: "danger" },
  { label: "IP ownership", status: "Clearly defined", tone: "success" },
];

export default function Home() {
  return (
    <main className="marketing-page">
      <header className="marketing-header">
        <Link className="marketing-brand" to="/" aria-label="LexAI home">
          <span className="marketing-brand-mark">L</span>
          <span>LexAI</span>
        </Link>
        <nav className="marketing-nav" aria-label="Main navigation">
          <a href="#features">Platform</a>
          <a href="#how-it-works">How it works</a>
          <Link to="/login">Sign in</Link>
          <Link className="marketing-nav-cta" to="/signup">
            Get started <ArrowUpRight size={15} />
          </Link>
        </nav>
      </header>

      <section className="marketing-hero">
        <div className="marketing-hero-copy">
          <div className="eyebrow">
            <Sparkles size={14} />
            LEGAL WORK, MADE CLEARER
          </div>
          <h1>
            Your contracts,
            <br />
            <span>understood.</span>
          </h1>
          <p>
            Bring clarity to complex legal documents. LexAI helps your team
            review agreements, surface risks, and find the clauses that matter.
          </p>
          <div className="marketing-hero-actions">
            <Link className="primary-button" to="/signup">
              Create your workspace <ArrowRight size={16} />
            </Link>
            <a className="marketing-text-link" href="#how-it-works">
              See how it works
            </a>
          </div>
          <div className="marketing-proof">
            <span className="proof-check"><Check size={13} /></span>
            <span>Built for clearer, more confident document reviews</span>
          </div>
        </div>

        <div className="marketing-visual">
          <div className="visual-orbit orbit-one"></div>
          <div className="visual-orbit orbit-two"></div>
          <div className="analysis-preview">
            <div className="preview-topline">
              <div className="preview-file-icon"><FileSearch size={17} /></div>
              <div>
                <strong>Master Service Agreement</strong>
                <span>TechCorp Inc. · 47 pages</span>
              </div>
              <span className="preview-ready"><span></span> Analyzed</span>
            </div>
            <div className="preview-summary">
              <div className="preview-summary-heading">
                <div>
                  <span className="preview-kicker">DOCUMENT OVERVIEW</span>
                  <h2>Review snapshot</h2>
                </div>
                <span className="preview-score">94<span>%</span></span>
              </div>
              <div className="preview-progress"><span></span></div>
              <div className="preview-progress-caption">
                <span>Analysis confidence</span>
                <span>High</span>
              </div>
            </div>
            <div className="preview-findings">
              <div className="preview-findings-heading">
                <span>Key findings</span>
                <span>03</span>
              </div>
              {analysisFindings.map((finding) => (
                <div className="preview-finding" key={finding.label}>
                  <span className={`finding-mark ${finding.tone}`}>
                    {finding.tone === "success" ? <Check size={13} /> : <span />}
                  </span>
                  <span className="finding-label">{finding.label}</span>
                  <span className={`finding-tag ${finding.tone}`}>
                    {finding.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="preview-footer">
              <span className="preview-ai-mark"><Sparkles size={13} /></span>
              AI-assisted review · Human-led decisions
            </div>
          </div>
          <div className="floating-note">
            <span className="floating-note-icon"><ShieldCheck size={17} /></span>
            <span><strong>Risks surfaced</strong><small>Before signature</small></span>
          </div>
        </div>
      </section>

      <section className="marketing-trust">
        <span>MADE FOR TEAMS THAT WORK WITH AGREEMENTS</span>
        <div>
          <strong>Legal teams</strong>
          <strong>Procurement</strong>
          <strong>Operations</strong>
          <strong>Growing businesses</strong>
        </div>
      </section>

      <section className="marketing-features" id="features">
        <div className="marketing-section-heading">
          <span className="eyebrow">A CLEARER WAY TO REVIEW</span>
          <h2>Spend less time searching.<br /><span>More time deciding.</span></h2>
          <p>Make every agreement easier to understand, one useful insight at a time.</p>
        </div>
        <div className="marketing-feature-grid">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article className="marketing-feature-card" key={title}>
              <span className="feature-icon"><Icon size={20} /></span>
              <span className="feature-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-how" id="how-it-works">
        <div className="how-content">
          <span className="eyebrow">SIMPLE BY DESIGN</span>
          <h2>From upload to<br /><span>understanding.</span></h2>
          <p>
            Start with a document. Get a structured review you can explore,
            discuss, and use to guide your next step.
          </p>
          <Link className="marketing-text-link" to="/login">
            Open the LexAI workspace <ArrowRight size={15} />
          </Link>
        </div>
        <div className="how-steps">
          {[
            ["01", "Add an agreement", "Bring a document into your workspace."],
            ["02", "Review the highlights", "Explore extracted clauses and potential risks."],
            ["03", "Make an informed decision", "Use clear findings to guide human review."],
          ].map(([number, title, description]) => (
            <div className="how-step" key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><p>{description}</p></div>
              <Check size={16} />
            </div>
          ))}
        </div>
      </section>

      <footer className="marketing-footer">
        <Link className="marketing-brand" to="/">
          <span className="marketing-brand-mark">L</span>
          <span>LexAI</span>
        </Link>
        <span>Legal intelligence for clearer decisions.</span>
        <Link to="/login">Sign in <ArrowRight size={14} /></Link>
      </footer>
    </main>
  );
}
