import re
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from uuid import uuid4

from fastapi import UploadFile

from app.models.document import DocumentCreate, DocumentRecord
from app.repositories.document_repository import DocumentRepository

MAX_FILE_SIZE = 25 * 1024 * 1024
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}
CHUNK_SIZE = 1024 * 1024


class DocumentServiceError(Exception):
    status_code = 400


class UnsupportedDocumentTypeError(DocumentServiceError):
    status_code = 415


class DocumentTooLargeError(DocumentServiceError):
    status_code = 413


class EmptyDocumentError(DocumentServiceError):
    status_code = 400


class DocumentNotFoundError(DocumentServiceError):
    status_code = 404


class DocumentService:
    def __init__(
        self,
        repository: DocumentRepository,
        upload_dir: Path,
    ) -> None:
        self.repository = repository
        self.upload_dir = upload_dir

    def list_documents(self) -> list[DocumentRecord]:
        return self.repository.list_documents()

    def get_document(self, document_id: int) -> DocumentRecord:
        document = self.repository.get_document(document_id)
        if document is None:
            raise DocumentNotFoundError("Document not found.")
        return document

    async def upload_document(self, file: UploadFile) -> DocumentRecord:
        original_filename = PurePosixPath(
            (file.filename or "").replace("\\", "/")
        ).name
        extension = Path(original_filename).suffix.lower()

        if not original_filename or extension not in ALLOWED_EXTENSIONS:
            raise UnsupportedDocumentTypeError(
                "Unsupported file type. Upload a PDF, DOCX, or TXT file."
            )

        self.upload_dir.mkdir(parents=True, exist_ok=True)
        stored_filename = f"{uuid4().hex}{extension}"
        stored_path = self.upload_dir / stored_filename
        file_size = 0

        try:
            with stored_path.open("xb") as output_file:
                while chunk := await file.read(CHUNK_SIZE):
                    file_size += len(chunk)
                    if file_size > MAX_FILE_SIZE:
                        raise DocumentTooLargeError(
                            "File size exceeds the 25 MB upload limit."
                        )
                    output_file.write(chunk)

            if file_size == 0:
                raise EmptyDocumentError("The uploaded file is empty.")

            document = DocumentCreate(
                name=re.sub(
                    r"\s+",
                    " ",
                    Path(original_filename).stem,
                ).strip(),
                original_filename=original_filename,
                stored_filename=stored_filename,
                file_type=extension[1:].upper(),
                file_size=file_size,
                uploaded_at=datetime.now(timezone.utc).isoformat(),
            )
            return self.repository.create_document(document)
        except Exception:
            stored_path.unlink(missing_ok=True)
            raise
        finally:
            await file.close()
