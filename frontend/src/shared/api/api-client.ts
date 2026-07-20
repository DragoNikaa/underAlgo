import { ApiError } from "./api-error.ts";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(response.status, data?.detail || response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get<T>(path: string, init?: RequestInit) {
    return request<T>(path, {
      ...init,
      method: "GET",
    });
  },

  post<T>(path: string, body?: unknown, init?: RequestInit) {
    return request<T>(path, {
      ...init,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put<T>(path: string, body?: unknown, init?: RequestInit) {
    return request<T>(path, {
      ...init,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  patch<T>(path: string, body?: unknown, init?: RequestInit) {
    return request<T>(path, {
      ...init,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete<T>(path: string, init?: RequestInit) {
    return request<T>(path, {
      ...init,
      method: "DELETE",
    });
  },
};
