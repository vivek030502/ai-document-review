import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
} from "lucide-react";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export default function UploadDropzone({
  selectedFile,
  setSelectedFile,
  error,
  setError,
}) {
  const inputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    setError("");

    if (!file) {
      return false;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(
        "Unsupported file type. Please upload a PDF, DOCX, or TXT file."
      );

      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "File size exceeds 25 MB. Please upload a smaller document."
      );

      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
  };

  return (
    <div>

      {!selectedFile ? (
        <div
          className={`upload-dropzone ${
            isDragging ? "dragging" : ""
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >

          <input
            ref={inputRef}
            type="file"
            hidden
            accept=".pdf,.docx,.txt"
            onChange={handleInputChange}
          />

          <div className="upload-icon">
            <Upload size={26} />
          </div>

          <div className="upload-title">
            Drop your document here
          </div>

          <div className="upload-description">
            or click to browse from your computer
          </div>

          <div className="upload-supported">
            PDF, DOCX or TXT · Maximum 25 MB
          </div>

        </div>
      ) : (
        <div className="selected-file">

          <div className="selected-file-icon">
            <FileText size={22} />
          </div>

          <div className="selected-file-info">

            <div className="selected-file-name">
              {selectedFile.name}
            </div>

            <div className="selected-file-size">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </div>

          </div>

          <button
            type="button"
            className="remove-file-button"
            onClick={removeFile}
          >
            <X size={18} />
          </button>

        </div>
      )}

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}

    </div>
  );
}