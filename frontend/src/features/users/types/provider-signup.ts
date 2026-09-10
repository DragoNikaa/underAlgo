import type { User } from "./user.ts";

export interface ProviderSignupData {
  data: {
    email: Email[];
    user: User;
  };
}

interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
}
