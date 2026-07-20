import { apiClient } from "../../shared/api/api-client.ts";
import { PATHS } from "../../shared/paths.ts";
import type { PaginatedResponse } from "../../shared/types/pagination.ts";
import type { AlgorithmDetail, AlgorithmListItem } from "./types/algorithm.ts";

export function getAlgorithms() {
  return apiClient.get<PaginatedResponse<AlgorithmListItem>>(
    PATHS.algorithm.list,
  );
}

export function getAlgorithm(slug: string) {
  return apiClient.get<AlgorithmDetail>(PATHS.algorithm.detail(slug));
}
