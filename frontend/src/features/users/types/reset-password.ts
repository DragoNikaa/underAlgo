import type { User } from "./user.ts";

export interface ResetPasswordData {
  data: {
    user?: User;
  };
}
