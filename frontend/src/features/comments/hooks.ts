import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { getComments, getReplies, postComment } from "./api/comments.ts";

export function useComments(algorithmSlug: string, search?: string) {
  return useSuspenseQuery({
    queryKey: ["comments", algorithmSlug, search],
    queryFn: () => getComments(algorithmSlug, search),
  });
}

export function useCreateComment(
  algorithmSlug: string,
  parentCommentId?: number,
) {
  const invalidateQueries = useInvalidateQueries(
    algorithmSlug,
    parentCommentId,
  );

  return useMutation({
    mutationFn: (body: string) =>
      postComment(algorithmSlug, body, parentCommentId),
    onSuccess: invalidateQueries,
  });
}

function useInvalidateQueries(algorithmSlug: string, parentCommentId?: number) {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: ["comments", algorithmSlug],
    });

    if (parentCommentId) {
      await queryClient.invalidateQueries({
        queryKey: ["replies", algorithmSlug],
      });
    }
  };
}

export function useReplies(
  algorithmSlug: string,
  commentId: number,
  enabled: boolean,
) {
  return useInfiniteQuery({
    queryKey: ["replies", algorithmSlug, commentId],
    queryFn: ({ pageParam }) => getReplies(algorithmSlug, commentId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page.current < lastPage.page.total
        ? lastPage.page.current + 1
        : undefined,
    enabled,
  });
}
