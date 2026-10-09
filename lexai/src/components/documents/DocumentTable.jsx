import {
  FileText,
  MoreHorizontal,
  Eye,
  SearchCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function formatUploadDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default function DocumentTable({ documents }) {
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch (status) {
      case "Reviewed":
        return "status-reviewed";

      case "Processing":
        return "status-processing";

      case "Risk Found":
        return "status-risk";

      default:
        return "";
    }
  };

  return (
    <div className="documents-table-wrapper">

      <table className="documents-table">

        <thead>
          <tr>
            <th>Document</th>
            <th>Client</th>
            <th>Type</th>
            <th>Pages</th>
            <th>Status</th>
            <th>Risks</th>
            <th>Uploaded</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {documents.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="empty-table"
              >
                <FileText size={28} />

                <div>
                  No documents found.
                </div>
              </td>
            </tr>
          ) : (
            documents.map((document) => (
              <tr key={document.id}>

                <td>

                  <div className="document-name-cell">

                    <div className="document-file-icon">
                      <FileText size={18} />
                    </div>

                    <div>
                      <div className="document-name">
                        {document.name}
                      </div>

                      <div className="document-id">
                        DOC-{document.id}
                      </div>
                    </div>

                  </div>

                </td>

                <td>
                  {document.client || document.company || "—"}
                </td>

                <td>
                  <span className="file-type">
                    {document.type}
                  </span>
                </td>

                <td>
                  {document.pages}
                </td>

                <td>

                  <span
                    className={`document-status ${getStatusClass(
                      document.status
                    )}`}
                  >
                    <span className="status-dot-small"></span>

                    {document.status}
                  </span>

                </td>

                <td>

                  {document.risks > 0 ? (
                    <span className="risk-count">
                      {document.risks}
                    </span>
                  ) : (
                    <span className="no-risk">
                      —
                    </span>
                  )}

                </td>

                <td>
                  {formatUploadDate(document.uploadedAt || document.uploaded)}
                </td>

                <td>

                  <div className="document-actions">

                    <button
                      type="button"
                      title="View Document"
                      onClick={() =>
                        navigate(
                          `/documents/${document.id}`
                        )
                      }
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      title="Contract Review"
                      onClick={() =>
                        navigate(
                          `/contract-review/${document.id}`
                        )
                      }
                    >
                      <SearchCheck size={17} />
                    </button>

                    <button
                      type="button"
                      title="More"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                  </div>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}