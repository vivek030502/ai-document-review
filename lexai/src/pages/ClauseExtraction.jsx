import { useMemo, useState } from "react";
import { Search, ScanText } from "lucide-react";

const clauses = [
  {
    name: "Limitation of Liability",
    category: "Financial",
    page: 12,
    confidence: 96,
    status: "Found",
    excerpt: "Maximum aggregate liability shall not exceed $10,000.",
  },
  {
    name: "Intellectual Property",
    category: "Ownership",
    page: 18,
    confidence: 99,
    status: "Found",
    excerpt: "Each party retains ownership of its pre-existing intellectual property.",
  },
  {
    name: "Data Protection",
    category: "Privacy",
    page: null,
    confidence: 98,
    status: "Missing",
    excerpt: "No data protection clause detected in this document.",
  },
  {
    name: "Termination",
    category: "Term",
    page: 27,
    confidence: 94,
    status: "Found",
    excerpt: "Either party may terminate with 30 days written notice.",
  },
  {
    name: "Confidentiality",
    category: "Privacy",
    page: 8,
    confidence: 97,
    status: "Found",
    excerpt: "The parties will protect all non-public information received.",
  },
];

export default function ClauseExtraction() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClause, setSelectedClause] = useState(null);

  const filteredClauses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return clauses.filter((clause) => {
      const matchesStatus =
        statusFilter === "All" || clause.status === statusFilter;
      const matchesSearch =
        !query ||
        [clause.name, clause.category, clause.excerpt]
          .some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="analysis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Clause Extraction</h1>
          <p className="page-description">
            Browse clauses detected in the Master Service Agreement
          </p>
        </div>
        <div className="clause-summary">
          <span className="clause-summary-value">{clauses.length}</span>
          <span>clauses analyzed</span>
        </div>
      </div>

      <div className="clause-overview">
        <div className="clause-overview-card">
          <span>Clauses found</span>
          <strong>{clauses.filter((clause) => clause.status === "Found").length}</strong>
        </div>
        <div className="clause-overview-card missing">
          <span>Missing clauses</span>
          <strong>{clauses.filter((clause) => clause.status === "Missing").length}</strong>
        </div>
        <div className="clause-overview-card">
          <span>Average confidence</span>
          <strong>
            {Math.round(
              clauses.reduce((total, clause) => total + clause.confidence, 0) /
                clauses.length
            )}
            %
          </strong>
        </div>
      </div>

      <section className="panel">
        <div className="risk-toolbar clause-toolbar">
          <div>
            <h2 className="section-heading">Extracted clauses</h2>
            <p className="page-description">
              Select a clause to review its extracted text
            </p>
          </div>
          <label className="document-search risk-search">
            <Search size={17} />
            <input
              aria-label="Search clauses"
              placeholder="Search clauses..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>
        <div className="filter-row">
          {["All", "Found", "Missing"].map((status) => (
            <button
              className={`filter-chip ${statusFilter === status ? "active" : ""}`}
              key={status}
              onClick={() => setStatusFilter(status)}
              type="button"
            >
              {status}
            </button>
          ))}
        </div>
        <div className="table-container">
          <table className="data-table clause-table">
            <thead>
              <tr>
                <th>Clause</th>
                <th>Category</th>
                <th>Page</th>
                <th>Confidence</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredClauses.length ? (
                filteredClauses.map((clause) => (
                  <tr
                    className={selectedClause?.name === clause.name ? "selected-row" : ""}
                    key={clause.name}
                    onClick={() => setSelectedClause(clause)}
                  >
                    <td className="clause-name">{clause.name}</td>
                    <td>{clause.category}</td>
                    <td>{clause.page ?? "—"}</td>
                    <td>{clause.confidence}%</td>
                    <td>
                      <span className={`badge ${clause.status === "Missing" ? "warning" : "success"}`}>
                        {clause.status}
                      </span>
                    </td>
                    <td>
                      <button
                        aria-label={`View ${clause.name}`}
                        className="icon-button clause-view-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedClause(clause);
                        }}
                        type="button"
                      >
                        <ScanText size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty-table" colSpan="6">
                    No clauses match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {selectedClause && (
          <div className="clause-excerpt">
            <div>
              <span className="clause-excerpt-label">EXTRACTED TEXT</span>
              <button
                className="text-button"
                onClick={() => setSelectedClause(null)}
                type="button"
              >
                Close
              </button>
            </div>
            <h3>{selectedClause.name}</h3>
            <p>{selectedClause.excerpt}</p>
          </div>
        )}
      </section>
    </div>
  );
}
