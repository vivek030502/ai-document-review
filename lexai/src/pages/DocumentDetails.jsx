import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { documents } from "../data/mockData";
import { getApiErrorMessage, getDocument } from "../services/api";

export default function DocumentDetails() {
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
          const sampleDocument = documents.find(
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
        Loading document details...
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
    <div className="details-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">{document.name}</h1>
          <p className="page-description">
            Document ID: DOC-{document.id} · {document.company}
          </p>
        </div>
        <Link
          to={`/contract-review/${id}`}
          className="primary-button"
          style={{ textDecoration: "none" }}
        >
          Open Contract Review
        </Link>
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header">
            <div className="panel-title">Document Information</div>
          </div>
          <div className="panel-body">
            <Info label="Document Type" value={document.type} />
            <Info label="Company" value={document.company} />
            <Info label="Pages" value={document.pages} />
            <Info label="Uploaded" value={document.uploaded} />
            <Info label="Status" value={document.status} />
            <Info label="Risks identified" value={document.risks} />
          </div>
        </section>
        <section className="panel">
          <div className="panel-header">
            <div className="panel-title">AI Processing</div>
          </div>
          <div className="panel-body">
            <Info label="OCR" value="Completed" />
            <Info label="Clause Extraction" value="Completed" />
            <Info label="Risk Analysis" value="Completed" />
            <Info label="AI Confidence" value="97.3%" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="detail-info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}