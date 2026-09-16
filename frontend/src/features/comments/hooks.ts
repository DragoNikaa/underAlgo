import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";

import { getComments, getReplies } from "./api/comments.ts";

export function useComments(algorithmSlug: string, search?: string) {
  return useSuspenseQuery({
    queryKey: ["comments", algorithmSlug, search],
    queryFn: () => getComments(algorithmSlug, search),
  });
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
