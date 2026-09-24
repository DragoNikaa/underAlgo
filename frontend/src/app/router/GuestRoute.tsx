import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSession } from "../../features/users/hooks.ts";
import { PATHS } from "../../shared/paths.ts";

export default function GuestRoute() {
  const location = useLocation();
  const { data: session } = useSession();

  return session ? (
    <Navigate to={location.state?.next ?? PATHS.algorithm.list} replace />
  ) : (
    <Outlet />
  );
}
