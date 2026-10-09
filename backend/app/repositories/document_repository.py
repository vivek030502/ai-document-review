import sqlite3
from pathlib import Path

from app.core.database import get_connection
from app.models.document import DocumentCreate, DocumentRecord


class DocumentRepository:
    def __init__(self, database_path: Path) -> None:
        self.database_path = database_path

    def list_documents(self) -> list[DocumentRecord]:
        with get_connection(self.database_path) as connection:
            rows = connection.execute(
                "SELECT * FROM documents ORDER BY id DESC"
            ).fetchall()
        return [self._to_record(row) for row in rows]

    def get_document(self, document_id: int) -> DocumentRecord | None:
        with get_connection(self.database_path) as connection:
            row = connection.execute(
                "SELECT * FROM documents WHERE id = ?",
                (document_id,),
            ).fetchone()
        return self._to_record(row) if row is not None else None

    def create_document(self, document: DocumentCreate) -> DocumentRecord:
        with get_connection(self.database_path) as connection:
            cursor = connection.execute(
                """
                INSERT INTO documents (
                    name, original_filename, stored_filename, file_type,
                    file_size, uploaded_at
                ) VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    document.name,
                    document.original_filename,
                    document.stored_filename,
                    document.file_type,
                    document.file_size,
                    document.uploaded_at,
                ),
            )
            document_id = cursor.lastrowid

        if document_id is None:
            raise RuntimeError("Database did not return the saved document ID.")

        record = self.get_document(document_id)
        if record is None:
            raise RuntimeError("Saved document could not be retrieved.")
        return record

    @staticmethod
    def _to_record(row: sqlite3.Row) -> DocumentRecord:
        return DocumentRecord(
            id=row["id"],
            name=row["name"],
            client=row["client"],
            file_type=row["file_type"],
            file_size=row["file_size"],
            uploaded_at=row["uploaded_at"],
            status=row["status"],
            risks=row["risks"],
        )
