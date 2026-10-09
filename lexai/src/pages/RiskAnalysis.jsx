import { useMemo, useState } from "react";
import { AlertTriangle, Check, Search } from "lucide-react";
import { risks as initialRisks } from "../data/mockData";

const severityTotals = [
  { label: "Critical", value: 12, className: "critical" },
  { label: "High", value: 31, className: "high" },
  { label: "Medium", value: 64, className: "medium" },
  { label: "Low", value: 36, className: "low" },
];

export default function RiskAnalysis() {
  const [risks, setRisks] = useState(initialRisks);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRisks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return risks.filter((risk) => {
      const matchesSeverity =
        severityFilter === "All" || risk.severity === severityFilter;
      const matchesSearch =
        !query ||
        [risk.category, risk.title, risk.status]
          .some((value) => value.toLowerCase().includes(query));

      return matchesSeverity && matchesSearch;
    });
  }, [risks, searchTerm, severityFilter]);

  const markReviewed = (riskId) => {
    setRisks((currentRisks) =>
      currentRisks.map((risk) =>
        risk.id === riskId ? { ...risk, status: "Reviewed" } : risk
      )
    );
  };

  return (
    <div className="analysis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Risk Analysis</h1>
          <p className="page-description">
            Review AI-detected contractual risks across your documents
          </p>
        </div>
      </div>

      <div className="stat-grid">
        {severityTotals.map(({ label, value, className }) => (
          <div className={`card risk-stat-card ${className}`} key={label}>
            <div className="risk-stat-heading">
              <AlertTriangle size={16} />
              <span>{label} risks</span>
            </div>
            <div className="stat-value">{value}</div>
            <div className="risk-stat-caption">Across all analyzed documents</div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="risk-toolbar">
          <div>
            <h2 className="section-heading">Detected risks</h2>
            <p className="page-description">
              {filteredRisks.length} findings shown from the demo dataset
            </p>
          </div>
          <label className="document-search risk-search">
            <Search size={17} />
            <input
              aria-label="Search risks"
              placeholder="Search risks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="filter-row" aria-label="Filter by severity">
          {["All", "Critical", "High", "Medium", "Low"].map((severity) => (
            <button
              className={`filter-chip ${severityFilter === severity ? "active" : ""}`}
              key={severity}
              onClick={() => setSeverityFilter(severity)}
              type="button"
            >
              {severity}
            </button>
          ))}
        </div>

        <div className="table-container">
          <table className="data-table risk-table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Category</th>
                <th>Finding</th>
                <th>Confidence</th>
                <th>Page</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRisks.length ? (
                filteredRisks.map((risk) => (
                  <tr key={risk.id}>
                    <td>
                      <span className={`severity-badge ${risk.severity.toLowerCase()}`}>
                        {risk.severity}
                      </span>
                    </td>
                    <td>{risk.category}</td>
                    <td className="risk-finding">{risk.title}</td>
                    <td>
                      <span className="confidence-value">{risk.confidence}%</span>
                    </td>
                    <td>{risk.page}</td>
                    <td>
                      <span className={`risk-status ${risk.status.toLowerCase()}`}>
                        {risk.status}
                      </span>
                    </td>
                    <td>
                      {risk.status === "Reviewed" ? (
                        <span className="reviewed-action">
                          <Check size={14} /> Reviewed
                        </span>
                      ) : (
                        <button
                          className="text-button"
                          onClick={() => markReviewed(risk.id)}
                          type="button"
                        >
                          Mark reviewed
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty-table" colSpan="7">
                    No risks match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
