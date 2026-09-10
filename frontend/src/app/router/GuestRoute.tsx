import { Navigate, Outlet } from "react-router-dom";

import { useSession } from "../../features/users/hooks.ts";
import { PATHS } from "../../shared/paths.ts";

export default function GuestRoute() {
  const { data: session } = useSession();

  return session ? <Navigate to={PATHS.algorithm.list} replace /> : <Outlet />;
}
