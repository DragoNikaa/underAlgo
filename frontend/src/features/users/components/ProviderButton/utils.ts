import type { Location } from "react-router-dom";

import { PATHS } from "../../../../shared/paths.ts";

const FRONTEND_BASE_URL: string = import.meta.env.VITE_FRONTEND_BASE_URL;

export function getProviderCallbackUrl(location: Location) {
  const callbackUrl = new URL(
    "." + PATHS.user.provider.completeSignup,
    FRONTEND_BASE_URL,
  );

  const from = location.state?.from;

  if (from) {
    callbackUrl.searchParams.set(
      "next",
      from.pathname + from.search + from.hash,
    );
  }

  return callbackUrl.toString();
}
