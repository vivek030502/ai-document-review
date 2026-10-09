import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

export function getApiErrorMessage(error, fallback) {
  const detail = error?.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => item?.msg)
      .filter((message) => typeof message === "string");
    if (messages.length) {
      return messages.join(" ");
    }
  }

  return error instanceof Error ? error.message : fallback;
}

export async function getBackendHealth() {
  const response = await apiClient.get("/health");

  if (response.data?.status !== "ok") {
    throw new Error("Backend health check returned an unexpected response.");
  }

  return response.data;
}

export async function getDocuments() {
  const response = await apiClient.get("/documents");
  return response.data;
}

export async function getDocument(documentId) {
  const response = await apiClient.get(`/documents/${documentId}`);
  return response.data;
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/documents", formData);
  return response.data;
}

export default apiClient;
