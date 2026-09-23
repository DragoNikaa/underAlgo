import { apiClient } from "./api-client.ts";
import { ENDPOINTS } from "./endpoints.ts";

type CSRFResponse = {
  csrf_token: string;
};

let CSRFToken: string | null = null;

export async function fetchCSRFToken() {
  const data = await apiClient.get<CSRFResponse>(ENDPOINTS.csrf);
  CSRFToken = data.csrf_token;
}

export function getCSRFToken() {
  return CSRFToken;
}
