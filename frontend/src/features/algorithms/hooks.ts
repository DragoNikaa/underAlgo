import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import {
  executeAlgorithm,
  getAlgorithm,
  getAlgorithms,
  getCategories,
  getDifficulties,
} from "./api/algorithms.ts";

export function useAlgorithms(search?: string) {
  return useSuspenseQuery({
    queryKey: ["algorithms", search],
    queryFn: () => getAlgorithms(search),
  });
}

export function useAlgorithm(slug: string) {
  return useSuspenseQuery({
    queryKey: ["algorithm", slug],
    queryFn: () => getAlgorithm(slug),
  });
}

export function useDifficulties() {
  return useSuspenseQuery({
    queryKey: ["difficulties"],
    queryFn: getDifficulties,
  });
}

export function useCategories() {
  return useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useExecution(slug: string) {
  return useMutation({
    mutationFn: (body: Record<string, unknown>) => executeAlgorithm(slug, body),
  });
}
