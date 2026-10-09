from fastapi import APIRouter, Depends, File, UploadFile, status

from app.controllers.document_controller import (
    DocumentController,
    create_document_controller,
)
from app.core.config import get_settings
from app.models.document import DocumentResponse
from app.repositories.document_repository import DocumentRepository
from app.services.document_service import DocumentService

router = APIRouter(prefix="/documents", tags=["documents"])


def get_document_controller() -> DocumentController:
    settings = get_settings()
    repository = DocumentRepository(settings.database_path)
    service = DocumentService(repository, settings.upload_dir)
    return create_document_controller(service)


@router.get("", response_model=list[DocumentResponse])
def list_documents(
    controller: DocumentController = Depends(get_document_controller),
) -> list[DocumentResponse]:
    return controller.list_documents()


@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(
    document_id: int,
    controller: DocumentController = Depends(get_document_controller),
) -> DocumentResponse:
    return controller.get_document(document_id)


@router.post(
    "",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    file: UploadFile = File(...),
    controller: DocumentController = Depends(get_document_controller),
) -> DocumentResponse:
    return await controller.upload_document(file)
