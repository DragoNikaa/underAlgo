import type { ComponentType } from "react";

import { GitHubIcon } from "./icons/GitHubIcon.tsx";
import { GoogleIcon } from "./icons/GoogleIcon.tsx";

export type AuthProvider = "github" | "google";

interface ProviderConfig {
  name: string;
  Icon: ComponentType;
}

export const PROVIDERS: Record<AuthProvider, ProviderConfig> = {
  github: {
    name: "GitHub",
    Icon: GitHubIcon,
  },

  google: {
    name: "Google",
    Icon: GoogleIcon,
  },
};
