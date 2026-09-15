import { apiClient } from "../../../shared/api/api-client.ts";
import { ENDPOINTS } from "../../../shared/api/endpoints.ts";
import type { PaginatedResponse } from "../../../shared/types/pagination.ts";
import type { Comment } from "../types/comment.ts";

export function getComments(algorithmSlug: string, search?: string) {
  return apiClient.get<PaginatedResponse<Comment>>(
    ENDPOINTS.comment.list(algorithmSlug),
    search,
  );
}
