import clsx from "clsx";

import { getCSRFToken } from "../../../../shared/api/csrf.ts";
import { ENDPOINTS } from "../../../../shared/api/endpoints.ts";
import { PATHS } from "../../../../shared/paths.ts";
import styles from "./ProviderButton.module.css";
import { type AuthProvider, PROVIDERS } from "./providers.ts";

const API_URL_ORIGIN: string = import.meta.env.VITE_API_URL_ORIGIN;
const FRONTEND_URL_ORIGIN: string = import.meta.env.VITE_FRONTEND_URL_ORIGIN;

type AuthMode = "signup" | "login";

const AUTH_MODE_LABELS: Record<AuthMode, string> = {
  signup: "Sign up with",
  login: "Log in with",
};

interface ProviderButtonProps {
  authMode: AuthMode;
  provider: AuthProvider;
  process?: "login" | "connect";
}

export default function ProviderButton({
  authMode,
  provider,
  process = "login",
}: ProviderButtonProps) {
  const { name, Icon } = PROVIDERS[provider];

  const callbackUrl =
    FRONTEND_URL_ORIGIN +
    (authMode === "signup"
      ? PATHS.user.provider.completeSignup
      : PATHS.algorithm.list);

  return (
    <form
      method="POST"
      action={API_URL_ORIGIN + ENDPOINTS.user.provider.redirect}
    >
      <input type="hidden" name="provider" value={provider} />
      <input type="hidden" name="process" value={process} />
      <input type="hidden" name="callback_url" value={callbackUrl} />
      <input type="hidden" name="csrfmiddlewaretoken" value={getCSRFToken()} />

      <button
        type="submit"
        className={clsx(styles.gsiMaterialButton, styles[provider])}
      >
        <div className={styles.gsiMaterialButtonState}></div>

        <div className={styles.gsiMaterialButtonContentWrapper}>
          <div className={styles.gsiMaterialButtonIcon}>
            <Icon />
          </div>

          <span className={styles.gsiMaterialButtonContents}>
            {AUTH_MODE_LABELS[authMode]} {name}
          </span>
        </div>
      </button>
    </form>
  );
}
