import { apiClient } from "../../../shared/api/api-client.ts";
import { ENDPOINTS } from "../../../shared/api/endpoints.ts";
import {
  DRFValidationError,
  isDRFValidationErrorResponse,
} from "../../../shared/api/errors.ts";
import type { PaginatedResponse } from "../../../shared/types/pagination.ts";
import type { Comment } from "../types/comment.ts";

export function getComments(algorithmSlug: string, search?: string) {
  return apiClient.get<PaginatedResponse<Comment>>(
    ENDPOINTS.comment.list(algorithmSlug),
    search,
  );
}

export async function postComment(
  algorithmSlug: string,
  body: string,
  parentCommentId?: number,
) {
  try {
    await apiClient.post<void>(
      parentCommentId
        ? ENDPOINTS.comment.replies.create(algorithmSlug, parentCommentId)
        : ENDPOINTS.comment.create(algorithmSlug),
      { body },
    );
  } catch (error) {
    if (isDRFValidationErrorResponse(error)) {
      throw new DRFValidationError(error.data);
    }
    throw error;
  }
}

export function getReplies(
  algorithmSlug: string,
  commentId: number,
  page: number,
) {
  return apiClient.get<PaginatedResponse<Comment>>(
    ENDPOINTS.comment.replies.list(algorithmSlug, commentId),
    `page=${page}`,
  );
}
