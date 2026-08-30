import { apiClient } from "./api-client.ts";
import { ENDPOINTS } from "./endpoints.ts";

export function initializeCSRFToken() {
  return apiClient.get<void>(ENDPOINTS.csrf);
}
