# LexAI Backend

FastAPI service for the LexAI frontend. Authentication, document storage, and
AI analysis will be added as separate features.

## Project structure

```text
app/
├── api/          # FastAPI route definitions and API router
├── controllers/  # HTTP request/response handling
├── core/         # Configuration and database connection helpers
├── models/       # Document request, persistence, and response models
├── repositories/ # SQLite persistence operations
└── services/     # Document validation and upload business logic
```

Routes delegate to controllers, controllers map service errors to HTTP
responses, services implement document behavior, and repositories own
database access.

## Local setup (Windows PowerShell)

From this directory:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open `http://127.0.0.1:8000/docs` for the interactive API documentation, or
check the health endpoint at `http://127.0.0.1:8000/api/v1/health`.

The `.env` file contains local configuration and is ignored by Git. Update
`FRONTEND_ORIGINS` there if the Vite frontend uses a different development
origin.

## Documents API

- `GET /api/v1/documents` lists uploaded document metadata.
- `GET /api/v1/documents/{id}` returns one document record.
- `POST /api/v1/documents` accepts multipart form data with a `file` field.
- Uploads are limited to 25 MB and PDF, DOCX, or TXT extensions.

Uploaded files are stored under `uploads/`; document metadata is stored in
`lexai.db`. Both are local development storage and are excluded from Git. Add
authentication, private production storage, malware scanning, and retention
policies before using this endpoint for real confidential legal documents.

## Frontend connection

The frontend's Vite development server proxies `/api` to
`http://127.0.0.1:8000`. Start this backend and the frontend dev server in
separate terminals; the frontend header will display the health-check status.
For a deployed frontend, set `VITE_API_BASE_URL` to the deployed API base URL
(including `/api/v1`) or configure the hosting server to proxy `/api`.
