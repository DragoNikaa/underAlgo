import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Loader from "../../../shared/components/Loader/Loader.tsx";
import { PATHS } from "../../../shared/paths.ts";

export default function ProviderCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const navigateTo = searchParams.has("error")
      ? PATHS.user.login
      : PATHS.user.provider.completeSignup;

    const next = searchParams.get("next");

    navigate(navigateTo, {
      state: { next },
      replace: true,
    });
  }, [searchParams, navigate]);

  return <Loader />;
}
