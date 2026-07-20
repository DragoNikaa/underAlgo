import { useSuspenseQuery } from "@tanstack/react-query";

import { getAlgorithm, getAlgorithms } from "./api.ts";

export function useAlgorithms() {
  return useSuspenseQuery({
    queryKey: ["algorithms"],
    queryFn: () => getAlgorithms(),
  });
}

export function useAlgorithm(slug: string) {
  return useSuspenseQuery({
    queryKey: ["algorithm", slug],
    queryFn: () => getAlgorithm(slug),
  });
}
