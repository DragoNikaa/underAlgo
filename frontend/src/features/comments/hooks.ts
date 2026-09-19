import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useRequireAuth } from "../users/hooks.ts";
import {
  getComments,
  getReplies,
  likeComment,
  postComment,
  unlikeComment,
} from "./api/comments.ts";

export function useComments(algorithmSlug: string, search?: string) {
  return useSuspenseQuery({
    queryKey: ["session", "comments", algorithmSlug, search],
    queryFn: () => getComments(algorithmSlug, search),
  });
}

export function useCommentCreation(
  algorithmSlug: string,
  parentCommentId?: number,
) {
  const requireAuth = useRequireAuth();
  const invalidateQueries = useInvalidateQueries(
    algorithmSlug,
    parentCommentId !== undefined,
  );

  return useMutation({
    mutationFn: (body: string) =>
      requireAuth(() => postComment(algorithmSlug, body, parentCommentId)),
    onSuccess: invalidateQueries,
  });
}

export function useCommentLike(algorithmSlug: string, id: number) {
  const requireAuth = useRequireAuth();
  const invalidateQueries = useInvalidateQueries(algorithmSlug);

  return useMutation({
    mutationFn: () => requireAuth(() => likeComment(algorithmSlug, id)),
    onSuccess: invalidateQueries,
  });
}

export function useCommentUnlike(algorithmSlug: string, id: number) {
  const requireAuth = useRequireAuth();
  const invalidateQueries = useInvalidateQueries(algorithmSlug);

  return useMutation({
    mutationFn: () => requireAuth(() => unlikeComment(algorithmSlug, id)),
    onSuccess: invalidateQueries,
  });
}

export function useReplies(
  algorithmSlug: string,
  commentId: number,
  enabled: boolean,
) {
  return useInfiniteQuery({
    queryKey: ["session", "replies", algorithmSlug, commentId],
    queryFn: ({ pageParam }) => getReplies(algorithmSlug, commentId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page.current < lastPage.page.total
        ? lastPage.page.current + 1
        : undefined,
    enabled,
  });
}

function useInvalidateQueries(
  algorithmSlug: string,
  invalidateReplies: boolean = true,
) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: ["session", "comments", algorithmSlug],
    });

    if (invalidateReplies) {
      queryClient.invalidateQueries({
        queryKey: ["session", "replies", algorithmSlug],
      });
    }
  };
}
