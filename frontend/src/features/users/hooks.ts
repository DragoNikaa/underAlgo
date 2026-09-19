import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { PATHS } from "../../shared/paths.ts";
import {
  completeProviderSignup,
  getProviderSignupData,
  getSession,
  login,
  logout,
  requestPassword,
  resetPassword,
  signup,
  validatePasswordResetKey,
  verifyEmail,
} from "./api/users.ts";

export function useSession() {
  return useSuspenseQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
}

export function useRequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session } = useSession();

  return async <T>(action: () => Promise<T>) => {
    if (session) return action();

    navigate(PATHS.user.login, {
      state: { from: location },
    });
  };
}

export function useSignup() {
  const invalidateQueries = useInvalidateQueries();

  return useMutation({
    mutationFn: signup,
    onSuccess: invalidateQueries,
  });
}

export function useProviderSignupData() {
  return useSuspenseQuery({
    queryKey: ["providerSignupData"],
    queryFn: getProviderSignupData,
  });
}

export function useCompleteProviderSignup(email: string) {
  const invalidateQueries = useInvalidateQueries();

  return useMutation({
    mutationFn: (username: string) => completeProviderSignup(username, email),
    onSuccess: invalidateQueries,
  });
}

export function useLogin() {
  const invalidateQueries = useInvalidateQueries();

  return useMutation({
    mutationFn: login,
    onSuccess: invalidateQueries,
  });
}

export function useLogout() {
  const invalidateQueries = useInvalidateQueries();

  return useMutation({
    mutationFn: logout,
    onSuccess: invalidateQueries,
  });
}

export function useEmailVerification(key: string) {
  return useSuspenseQuery({
    queryKey: ["verifyEmail", key],
    queryFn: () => verifyEmail(key),
  });
}

export function usePasswordRequest() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: requestPassword,
    onSuccess: () => navigate(PATHS.algorithm.list),
  });
}

export function usePasswordResetKeyValidation(key: string) {
  return useSuspenseQuery({
    queryKey: ["passwordResetKeyValidation", key],
    queryFn: () => validatePasswordResetKey(key),
  });
}

export function usePasswordReset(key: string) {
  const invalidateQueries = useInvalidateQueries();

  return useMutation({
    mutationFn: (password: string) => resetPassword(key, password),
    onSuccess: invalidateQueries,
  });
}

function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: ["session"],
    });
}
