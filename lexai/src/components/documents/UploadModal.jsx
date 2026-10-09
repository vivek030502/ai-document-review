import { useState } from "react";
import {
  X,
  Upload,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import UploadDropzone from "./UploadDropzone";
import {
  getApiErrorMessage,
  uploadDocument,
} from "../../services/api";

export default function UploadModal({
  isOpen,
  onClose,
  onUploadComplete,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a document before uploading.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const newDocument = await uploadDocument(selectedFile);
      onUploadComplete?.(newDocument);
      setUploadCompleted(true);
    } catch (uploadError) {
      setError(getApiErrorMessage(
        uploadError,
        "Upload failed. Check that the backend is running and try again."
      ));
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (uploading) {
      return;
    }

    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="upload-modal">

        {/* Header */}

        <div className="upload-modal-header">

          <div>
            <h2>Upload Document</h2>

            <p>
              Upload a legal document for AI-powered analysis.
            </p>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={handleClose}
            disabled={uploading}
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}

        <div className="upload-modal-body">

          {!uploadCompleted ? (
            <>
              <UploadDropzone
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                error={error}
                setError={setError}
              />

              {uploading && (
                <div className="upload-progress-header" role="status">
                  Uploading document to LexAI...
                </div>
              )}
            </>
          ) : (
            <div className="upload-success">

              <div className="success-icon">
                <CheckCircle2 size={42} />
              </div>

              <h3>
                Document uploaded successfully
              </h3>

              <p>
                Your document has been added to the processing queue.
              </p>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="upload-modal-footer">

          {!uploadCompleted ? (
            <>
              <button
                type="button"
                className="secondary-button"
                onClick={handleClose}
                disabled={uploading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
              >
                {uploading ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="spin"
                    />

                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={17} />

                    Upload Document
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={onClose}
            >
              Done
            </button>
          )}

        </div>

      </div>

    </div>
  );
}