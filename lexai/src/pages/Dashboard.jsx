import {
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";

import {
  documents,
  insights,
} from "../data/mockData";

export default function Dashboard() {
  return (
    <div>

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Document Intelligence
          </h1>

          <p className="page-description">
            AI-powered legal document analysis and risk detection
          </p>

        </div>

        <Link
          className="primary-button"
          to="/documents?upload=1"
          style={{ textDecoration: "none" }}
        >
          + Upload Document
        </Link>

      </div>

      <div className="stat-grid">

        <StatCard
          label="Docs Analyzed"
          value="2,847"
          change="↑ 12% this month"
        />

        <StatCard
          label="Risks Flagged"
          value="143"
          change="↑ 8 this week"
          changeType="warning"
        />

        <StatCard
          label="Review Time Saved"
          value="89%"
          change="vs. manual review"
        />

        <StatCard
          label="AI Accuracy"
          value="97.3%"
          change="↑ 1.2% this quarter"
        />

      </div>

      <div className="dashboard-grid">

        <section className="panel">

          <div className="panel-header">

            <div className="panel-title">
              Recent Documents
            </div>

            <Link
              className="text-button"
              to="/documents"
              style={{ textDecoration: "none" }}
            >
              View all
            </Link>

          </div>

          <div className="panel-body">

            {documents.map((document) => (

              <Link
                className="document-row"
                key={document.id}
                to={`/documents/${document.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >

                <div className="file-icon">
                  {document.type}
                </div>

                <div className="document-info">

                  <div className="document-name">
                    {document.name} — {document.company}
                  </div>

                  <div className="document-meta">
                    {document.pages} pages
                    {" · "}
                    Uploaded {document.uploaded}
                    {" · "}
                    {document.risks
                      ? `${document.risks} clauses flagged`
                      : "Clean"}
                  </div>

                </div>

                <StatusBadge status={document.status} />

              </Link>

            ))}

          </div>

        </section>

        <section className="panel">

          <div className="panel-header">

            <div className="panel-title">
              AI Insights
            </div>

          </div>

          <div className="panel-body">

            {insights.map((insight) => (

              <div
                className="insight"
                key={insight.title}
              >

                <div className="insight-title">

                  {insight.type === "success" ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <AlertTriangle size={13} />
                  )}

                  {" "}
                  {insight.title}

                </div>

                <div className="insight-text">
                  {insight.text}
                </div>

                <div className="progress">

                  <div
                    className="progress-bar"
                    style={{
                      width: `${insight.confidence}%`,
                    }}
                  />

                </div>

                <div
                  style={{
                    textAlign: "right",
                    marginTop: "4px",
                    fontSize: "9px",
                    color: "#7568d9",
                  }}
                >
                  {insight.confidence}%
                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </div>
  );
}

function StatusBadge({ status }) {

  let className = "badge";

  if (status === "Reviewed") {
    className += " success";
  }

  if (status === "Processing") {
    className += " processing";
  }

  if (status === "Risk Found") {
    className += " warning";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}