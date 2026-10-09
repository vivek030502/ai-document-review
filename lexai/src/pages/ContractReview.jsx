import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Printer,
} from "lucide-react";

import { documents as sampleDocuments } from "../data/mockData";
import { getApiErrorMessage, getDocument } from "../services/api";

const findings = [
  {
    title: "Limitation of Liability",
    severity: "High risk",
    text: "Liability is capped at $10,000, which is below the expected contractual standard.",
    icon: AlertTriangle,
  },
  {
    title: "Data Protection",
    severity: "Missing clause",
    text: "No explicit data protection clause was found in this agreement.",
    icon: AlertTriangle,
  },
  {
    title: "IP Ownership",
    severity: "Clear",
    text: "Intellectual property rights appear clearly defined in Section 12.",
    icon: CheckCircle2,
  },
  {
    title: "Termination",
    severity: "Review",
    text: "The 30-day notice period is shorter than the 90-day benchmark.",
    icon: AlertTriangle,
  },
];

export default function ContractReview() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDocument = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const result = await getDocument(id);
        if (isMounted) {
          setDocument(result);
        }
      } catch (error) {
        if (isMounted) {
          const sampleDocument = sampleDocuments.find(
            (item) => String(item.id) === id
          );
          if (error.response?.status === 404 && sampleDocument) {
            setDocument(sampleDocument);
          } else {
            setLoadError(
              getApiErrorMessage(error, "Unable to load this document.")
            );
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="documents-loading" role="status">
        Loading document for review...
      </div>
    );
  }

  if (!document) {
    return (
      <section className="panel empty-state">
        <FileText size={30} />
        <h1 className="page-title">
          {loadError ? "Unable to load document" : "Document not found"}
        </h1>
        <p className="page-description">
          {loadError || "This document is not available in the workspace."}
        </p>
        <Link className="primary-button" to="/documents">
          Browse documents
        </Link>
      </section>
    );
  }

  return (
    <div className="review-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Contract Review</h1>
          <p className="page-description">
            AI-assisted analysis for {document.name} · {document.company}
          </p>
        </div>

        <div className="page-actions">
          <Link
            className="secondary-button"
            to={`/documents/${document.id}`}
          >
            Document details
          </Link>
          <button
            className="primary-button"
            type="button"
            onClick={() => window.print()}
          >
            <Printer size={16} />
            Print review
          </button>
        </div>
      </div>

      <div className="review-grid">
        <section className="panel review-document-panel">
          <div className="panel-header">
            <div className="panel-title">
              <FileText size={15} />
              <span>{document.name}</span>
            </div>
            <span className={`badge ${document.status === "Reviewed" ? "success" : "processing"}`}>
              {document.status}
            </span>
          </div>

          <article className="document-preview">
            <div className="document-preview-meta">
              {document.company || document.client} <span>·</span> Page 1 of {document.pages}
            </div>
            <h2>{document.name.toUpperCase()}</h2>
            <p>
              This agreement is entered into by and between {document.company || document.client}
              {" "}and the service provider (the “Parties”), effective as of the
              date of the last signature below.
            </p>
            <h3>8. LIMITATION OF LIABILITY</h3>
            <p>
              Except for obligations expressly described herein, the maximum
              aggregate liability of either party shall not exceed{" "}
              <mark>$10,000</mark>. This limitation applies to claims arising
              from or related to this agreement.
            </p>
            <h3>12. INTELLECTUAL PROPERTY</h3>
            <p>
              Each party retains ownership of its pre-existing intellectual
              property. Work product created under this agreement will be
              governed by the applicable statement of work.
            </p>
            <h3>15. TERMINATION</h3>
            <p>
              Either party may terminate this agreement by providing{" "}
              <mark>30 days</mark> written notice to the other party.
            </p>
          </article>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div className="panel-title">AI findings</div>
            <span className="review-findings-count">{findings.length} findings</span>
          </div>
          <div className="panel-body review-findings">
            {findings.map(({ title, severity, text, icon: Icon }) => (
              <article className="insight" key={title}>
                <div className="insight-title">
                  <Icon size={15} />
                  <span>{title}</span>
                </div>
                <span
                  className={`finding-severity ${
                    severity === "Clear" ? "success" : "warning"
                  }`}
                >
                  {severity}
                </span>
                <p className="insight-text">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
