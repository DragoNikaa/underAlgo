import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { PATHS } from "../../shared/paths.ts";
import { signup } from "./api/users.ts";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => navigate(PATHS.user.login),
  });
}
