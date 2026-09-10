import { apiClient } from "../../../shared/api/api-client.ts";
import { ENDPOINTS } from "../../../shared/api/endpoints.ts";
import {
  DRFValidationError,
  isDRFValidationErrorResponse,
} from "../../../shared/api/errors.ts";
import type { PaginatedResponse } from "../../../shared/types/pagination.ts";
import type {
  AlgorithmDetail,
  AlgorithmExecution,
  AlgorithmListItem,
} from "../types/algorithm.ts";
import type { Category } from "../types/category.ts";
import type { Difficulty } from "../types/difficulty.ts";

export function getAlgorithms(search?: string) {
  return apiClient.get<PaginatedResponse<AlgorithmListItem>>(
    ENDPOINTS.algorithm.list,
    search,
  );
}

export function getAlgorithm(slug: string) {
  return apiClient.get<AlgorithmDetail>(ENDPOINTS.algorithm.detail(slug));
}

export function getDifficulties() {
  return apiClient.get<Difficulty[]>(ENDPOINTS.difficulty.list);
}

export function getCategories() {
  return apiClient.get<Category[]>(ENDPOINTS.category.list);
}

export async function executeAlgorithm(
  slug: string,
  body: Record<string, unknown>,
) {
  try {
    return await apiClient.post<AlgorithmExecution>(
      ENDPOINTS.algorithm.execution(slug),
      body,
    );
  } catch (error) {
    if (isDRFValidationErrorResponse(error)) {
      throw new DRFValidationError(error.data);
    }
    throw error;
  }
}
