import type { Location } from "react-router-dom";

import { PATHS } from "../../../../shared/paths.ts";

const BASE_URL: string = import.meta.env.BASE_URL;

export function getProviderCallbackUrl(location: Location) {
  const callbackUrl = new URL(
    PATHS.user.provider.callback.slice(1),
    window.location.origin + BASE_URL,
  );

  const next = location.state?.next;

  if (next) {
    callbackUrl.searchParams.set("next", next);
  }

  return callbackUrl.toString();
}
