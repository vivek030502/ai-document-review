from fastapi import HTTPException, UploadFile

from app.models.document import DocumentResponse
from app.services.document_service import DocumentService, DocumentServiceError


class DocumentController:
    def __init__(self, service: DocumentService) -> None:
        self.service = service

    def list_documents(self) -> list[DocumentResponse]:
        return [
            DocumentResponse.from_record(document)
            for document in self.service.list_documents()
        ]

    def get_document(self, document_id: int) -> DocumentResponse:
        return DocumentResponse.from_record(
            self._run(self.service.get_document, document_id)
        )

    async def upload_document(self, file: UploadFile) -> DocumentResponse:
        return DocumentResponse.from_record(
            await self._run_async(self.service.upload_document, file)
        )

    @staticmethod
    def _run(operation, *args):
        try:
            return operation(*args)
        except DocumentServiceError as error:
            raise HTTPException(
                status_code=error.status_code,
                detail=str(error),
            ) from error

    @staticmethod
    async def _run_async(operation, *args):
        try:
            return await operation(*args)
        except DocumentServiceError as error:
            raise HTTPException(
                status_code=error.status_code,
                detail=str(error),
            ) from error


def create_document_controller(
    service: DocumentService,
) -> DocumentController:
    return DocumentController(service)
