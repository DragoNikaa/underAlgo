import { getCSRFToken } from "./csrf.ts";
import { ApiError } from "./errors.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
  get<T>(path: string, search?: string, headers?: HeadersInit) {
    return request<T>(path, { method: "GET", headers }, search);
  },

  post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  patch<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete<T>(path: string) {
    return request<T>(path, { method: "DELETE" });
  },
};

async function request<T>(
  path: string,
  init: RequestInit,
  search?: string,
): Promise<T> {
  const response = await fetch(buildUrl(path, search), addDefaultOptions(init));

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data as T;
}

function buildUrl(path: string, search?: string) {
  const url = new URL(path, API_BASE_URL);
  if (search) url.search = search;
  return url;
}

function addDefaultOptions(init: RequestInit): RequestInit {
  const CSRFToken = getCSRFToken();

  return {
    credentials: "include",
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body && {
        "Content-Type": "application/json",
      }),
      ...(CSRFToken && {
        "X-CSRFToken": CSRFToken,
      }),
      ...init.headers,
    },
  };
}
