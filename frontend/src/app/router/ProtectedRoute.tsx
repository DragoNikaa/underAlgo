import { Navigate, Outlet } from "react-router-dom";

import { useSession } from "../../features/users/hooks.ts";
import { PATHS } from "../../shared/paths.ts";

export default function ProtectedRoute() {
  const { data: session } = useSession();

  return session ? <Outlet /> : <Navigate to={PATHS.user.login} replace />;
}
