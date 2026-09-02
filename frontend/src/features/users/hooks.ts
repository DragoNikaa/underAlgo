import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { PATHS } from "../../shared/paths.ts";
import {
  completeProviderSignup,
  getProviderSignupData,
  signup,
} from "./api/users.ts";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => navigate(PATHS.algorithm.list),
  });
}

export function useProviderSignupData() {
  return useSuspenseQuery({
    queryKey: ["providerSignupData"],
    queryFn: getProviderSignupData,
  });
}

export function useCompleteProviderSignup(email: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (username: string) => completeProviderSignup(username, email),
    onSuccess: () => navigate(PATHS.algorithm.list),
  });
}
