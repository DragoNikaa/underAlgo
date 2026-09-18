import type { Location } from "react-router-dom";

import { PATHS } from "../../../../shared/paths.ts";

const FRONTEND_URL_ORIGIN: string = import.meta.env.VITE_FRONTEND_URL_ORIGIN;

export function getProviderCallbackUrl(location: Location) {
  const callbackUrl = new URL(
    PATHS.user.provider.completeSignup,
    FRONTEND_URL_ORIGIN,
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
