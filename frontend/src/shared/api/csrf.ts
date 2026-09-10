import { apiClient } from "./api-client.ts";
import { ENDPOINTS } from "./endpoints.ts";

export function fetchCSRFToken() {
  return apiClient.get<void>(ENDPOINTS.csrf);
}

export function getCSRFToken() {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("csrftoken="))
    ?.split("=")[1];
}
