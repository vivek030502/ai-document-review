import { useState } from "react";
import {
  ArrowDownToLine,
  BarChart3,
  FileText,
  Plus,
} from "lucide-react";

const reportTemplates = [
  {
    title: "Portfolio Risk Report",
    description: "Overall contractual risk across your document portfolio.",
    detail:
      "The portfolio contains 143 flagged risks. Liability and data protection are the most common review areas.",
    icon: BarChart3,
    updatedAt: "Updated today",
  },
  {
    title: "Clause Analysis",
    description: "Clause frequency and missing clause analysis.",
    detail:
      "Data protection language is missing in 18% of reviewed agreements. Termination clauses average 45 days' notice.",
    icon: FileText,
    updatedAt: "Updated yesterday",
  },
  {
    title: "AI Performance",
    description: "Model accuracy, confidence and processing statistics.",
    detail:
      "Current AI accuracy is 97.3%. Average confidence is 94% across extracted clauses and risk findings.",
    icon: BarChart3,
    updatedAt: "Updated yesterday",
  },
  {
    title: "Review Activity",
    description: "Human review activity and time saved.",
    detail:
      "AI-assisted review has saved an estimated 89% of manual review time this quarter.",
    icon: FileText,
    updatedAt: "Updated Oct 6",
  },
];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const generateReport = () => {
    const report = {
      ...reportTemplates[0],
      id: Date.now(),
      updatedAt: "Generated just now",
    };
    setReports((currentReports) => [report, ...currentReports]);
    setSelectedReport(report);
  };

  const downloadReport = (report) => {
    const content = [
      report.title,
      `Generated: ${new Date().toLocaleString()}`,
      "",
      report.detail,
      "",
      "This is a sample report generated from the LexAI demo data.",
    ].join("\n");
    const fileUrl = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${report.title.toLowerCase().replaceAll(" ", "-")}.txt`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 0);
  };

  const allReports = [
    ...reports,
    ...reportTemplates.map((report, index) => ({
      ...report,
      id: `template-${index}`,
    })),
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-description">
            AI-generated legal intelligence reports
          </p>
        </div>
        <button className="primary-button" onClick={generateReport} type="button">
          <Plus size={17} />
          Generate report
        </button>
      </div>

      {selectedReport && (
        <section className="panel report-preview">
          <div className="report-preview-header">
            <div>
              <span className="report-preview-label">REPORT PREVIEW</span>
              <h2>{selectedReport.title}</h2>
              <p>{selectedReport.updatedAt}</p>
            </div>
            <div className="page-actions">
              <button
                className="secondary-button"
                onClick={() => setSelectedReport(null)}
                type="button"
              >
                Close preview
              </button>
              <button
                className="primary-button"
                onClick={() => downloadReport(selectedReport)}
                type="button"
              >
                <ArrowDownToLine size={16} />
                Download
              </button>
            </div>
          </div>
          <p className="report-preview-text">{selectedReport.detail}</p>
          <div className="report-preview-note">
            This preview uses sample workspace data. Connect a backend to
            generate reports from live documents.
          </div>
        </section>
      )}

      <div className="report-grid">
        {allReports.map((report) => {
          const Icon = report.icon;
          const generated = typeof report.id === "number";

          return (
            <article className="card report-card" key={report.id}>
              <div className="report-card-top">
                <span className="report-icon">
                  <Icon size={19} />
                </span>
                {generated && <span className="report-new-badge">NEW</span>}
              </div>
              <div className="stat-label">
                {generated ? "GENERATED REPORT" : "REPORT"}
              </div>
              <h2>{report.title}</h2>
              <p>{report.description}</p>
              <div className="report-card-footer">
                <span>{report.updatedAt}</span>
                <button
                  className="text-button"
                  onClick={() => setSelectedReport(report)}
                  type="button"
                >
                  Open report
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
