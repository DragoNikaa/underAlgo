import type { User } from "./user.ts";

export interface Session {
  data: {
    user: User;
  };
}
