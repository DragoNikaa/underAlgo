import { ApiError, ValidationError } from "./errors.ts";

const URL_ORIGIN: string = import.meta.env.VITE_API_URL_ORIGIN;

export const apiClient = {
  get<T>(path: string, search?: string) {
    return request<T>(path, { method: "GET" }, search);
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
  const response = await fetch(buildUrl(path, search), addDefaultHeaders(init));

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function buildUrl(path: string, search?: string) {
  const url = new URL(path, URL_ORIGIN);
  if (search) url.search = search;
  return url;
}

function addDefaultHeaders(init: RequestInit): RequestInit {
  return {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  };
}

async function handleErrorResponse(response: Response): Promise<never> {
  const data = await response.json().catch(() => null);

  if (response.status === 400) {
    throw new ValidationError(data);
  }

  throw new ApiError(response.status, data?.detail || response.statusText);
}
