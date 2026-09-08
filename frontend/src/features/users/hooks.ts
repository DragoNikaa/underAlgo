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
  getResetPasswordData,
  getSession,
  login,
  logout,
  requestPassword,
  resetPassword,
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

export function useRequestPassword() {
  const navigateAfterAuth = useNavigateAfterAuth();

  return useMutation({
    mutationFn: requestPassword,
    onSuccess: navigateAfterAuth,
  });
}

export function useResetPasswordData(key: string) {
  return useSuspenseQuery({
    queryKey: ["resetPasswordData", key],
    queryFn: () => getResetPasswordData(key),
  });
}

export function useResetPassword(key: string) {
  const handleAuthSuccess = useHandleAuthSuccess();

  return useMutation({
    mutationFn: (password: string) => resetPassword(key, password),
    onSuccess: handleAuthSuccess,
  });
}

function useHandleAuthSuccess() {
  const queryClient = useQueryClient();
  const navigateAfterAuth = useNavigateAfterAuth();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: ["session"],
    });

    navigateAfterAuth();
  };
}

function useNavigateAfterAuth() {
  const navigate = useNavigate();

  return () => {
    navigate(PATHS.algorithm.list);
  };
}
