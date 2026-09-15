import { useSuspenseQuery } from "@tanstack/react-query";

import { getComments } from "./api/comments.ts";

export function useComments(algorithmSlug: string, search?: string) {
  return useSuspenseQuery({
    queryKey: ["comments", algorithmSlug, search],
    queryFn: () => getComments(algorithmSlug, search),
  });
}
