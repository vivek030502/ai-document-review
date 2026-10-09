from pydantic import BaseModel, ConfigDict, Field


class DocumentCreate(BaseModel):
    name: str
    original_filename: str
    stored_filename: str
    file_type: str
    file_size: int
    uploaded_at: str


class DocumentRecord(BaseModel):
    id: int
    name: str
    client: str
    file_type: str
    file_size: int
    uploaded_at: str
    status: str
    risks: int


class DocumentResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: int
    name: str
    client: str
    company: str
    type: str
    pages: str
    status: str
    risks: int
    uploaded_at: str = Field(alias="uploadedAt")
    size: int

    @classmethod
    def from_record(cls, record: DocumentRecord) -> "DocumentResponse":
        return cls(
            id=record.id,
            name=record.name,
            client=record.client,
            company=record.client,
            type=record.file_type,
            pages="--",
            status=record.status,
            risks=record.risks,
            uploaded_at=record.uploaded_at,
            size=record.file_size,
        )
