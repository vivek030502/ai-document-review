import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Upload,
  Search,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import DocumentTable from "../components/documents/DocumentTable";
import UploadModal from "../components/documents/UploadModal";

import { getApiErrorMessage, getDocuments } from "../services/api";

export default function Documents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const isUploadModalOpen =
    showUploadModal || searchParams.get("upload") === "1";
  const searchTerm = searchParams.get("search") || "";

  const loadDocuments = useCallback(async () => {
    try {
      setDocuments(await getDocuments());
    } catch (error) {
      setLoadError(getApiErrorMessage(
        error,
        "Unable to load documents. Check that the backend is running."
      ));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getDocuments()
      .then((result) => {
        if (isMounted) {
          setDocuments(result);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setLoadError(getApiErrorMessage(
            error,
            "Unable to load documents. Check that the backend is running."
          ));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const closeUploadModal = () => {
    setShowUploadModal(false);

    if (searchParams.has("upload")) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("upload");
      setSearchParams(nextParams, { replace: true });
    }
  };

  const retryLoadingDocuments = () => {
    setIsLoading(true);
    setLoadError("");
    loadDocuments();
  };

  const filteredDocuments = useMemo(() => {

    if (!searchTerm.trim()) {
      return documents;
    }

    const search = searchTerm
      .toLowerCase()
      .trim();

    return documents.filter((document) => {

      return (
        document.name
          ?.toLowerCase()
          .includes(search) ||

        document.client
          ?.toLowerCase()
          .includes(search) ||

        document.company
          ?.toLowerCase()
          .includes(search) ||

        document.type
          ?.toLowerCase()
          .includes(search) ||

        document.status
          ?.toLowerCase()
          .includes(search)
      );
    });

  }, [documents, searchTerm]);

  const handleSearchChange = (event) => {
    const nextParams = new URLSearchParams(searchParams);
    const nextSearchTerm = event.target.value;

    if (nextSearchTerm) {
      nextParams.set("search", nextSearchTerm);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const totalDocuments = documents.length;

  const reviewedDocuments = documents.filter(
    (document) =>
      document.status === "Reviewed"
  ).length;

  const processingDocuments = documents.filter(
    (document) =>
      document.status === "Processing"
  ).length;

  const totalRisks = documents.reduce(
    (total, document) =>
      total + (document.risks || 0),
    0
  );

  const handleUploadComplete = (newDocument) => {
    setDocuments((currentDocuments) => [
      newDocument,
      ...currentDocuments,
    ]);
  };

  return (
    <div className="page-container">

      {/* Page Header */}

      <div className="page-header">

        <div>

          <div className="page-title">
            Documents
          </div>

          <div className="page-description">
            Manage and analyze your legal documents
          </div>

        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={18} />

          Upload Document
        </button>

      </div>

      {/* Statistics */}

      <div className="document-stats">

        <div className="document-stat-card">

          <div className="document-stat-icon">
            <FileText size={20} />
          </div>

          <div>

            <div className="document-stat-value">
              {totalDocuments}
            </div>

            <div className="document-stat-label">
              Total Documents
            </div>

          </div>

        </div>

        <div className="document-stat-card">

          <div className="document-stat-icon success">
            <CheckCircle2 size={20} />
          </div>

          <div>

            <div className="document-stat-value">
              {reviewedDocuments}
            </div>

            <div className="document-stat-label">
              Reviewed
            </div>

          </div>

        </div>

        <div className="document-stat-card">

          <div className="document-stat-icon warning">
            <Clock3 size={20} />
          </div>

          <div>

            <div className="document-stat-value">
              {processingDocuments}
            </div>

            <div className="document-stat-label">
              Processing
            </div>

          </div>

        </div>

        <div className="document-stat-card">

          <div className="document-stat-icon danger">
            <AlertTriangle size={20} />
          </div>

          <div>

            <div className="document-stat-value">
              {totalRisks}
            </div>

            <div className="document-stat-label">
              Risks Identified
            </div>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="documents-toolbar">

        <div className="document-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

        </div>

      </div>

      {loadError && (
        <div className="documents-api-message error" role="alert">
          <span>{loadError}</span>
          <button className="text-button" onClick={retryLoadingDocuments} type="button">
            Retry
          </button>
        </div>
      )}

      {!loadError && !isLoading && (
        <div className="documents-api-message" role="status">
          Documents are loaded from the LexAI backend.
        </div>
      )}

      {/* Documents Table */}

      <div className="documents-card">

        <div className="documents-card-header">

          <div>

            <h2>
              All Documents
            </h2>

            <span>
              {isLoading ? "Loading documents..." : `${filteredDocuments.length} documents`}
            </span>

          </div>

        </div>

        {isLoading ? (
          <div className="documents-loading" role="status">
            Loading documents from the backend...
          </div>
        ) : (
          <DocumentTable documents={filteredDocuments} />
        )}

      </div>

      {/* Upload Modal */}

      {isUploadModalOpen && (
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={closeUploadModal}
          onUploadComplete={handleUploadComplete}
        />
      )}

    </div>
  );
}