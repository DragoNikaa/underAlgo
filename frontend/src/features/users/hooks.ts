import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { PATHS } from "../../shared/paths.ts";
import {
  completeProviderSignup,
  getProviderSignupData,
  getSession,
  login,
  logout,
  signup,
} from "./api/users.ts";

export function useSession() {
  return useSuspenseQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
}

export function useSignup() {
  const handleAuthSuccess = useHandleAuthSuccess();

  return useMutation({
    mutationFn: signup,
    onSuccess: handleAuthSuccess,
  });
}

export function useProviderSignupData() {
  return useSuspenseQuery({
    queryKey: ["providerSignupData"],
    queryFn: getProviderSignupData,
  });
}

export function useCompleteProviderSignup(email: string) {
  const handleAuthSuccess = useHandleAuthSuccess();

  return useMutation({
    mutationFn: (username: string) => completeProviderSignup(username, email),
    onSuccess: handleAuthSuccess,
  });
}

export function useLogin() {
  const handleAuthSuccess = useHandleAuthSuccess();

  return useMutation({
    mutationFn: login,
    onSuccess: handleAuthSuccess,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.setQueryData(["session"], null),
  });
}

function useHandleAuthSuccess() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: ["session"],
    });

    navigate(PATHS.algorithm.list);
  };
}
