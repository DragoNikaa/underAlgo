import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import { useSession } from "../../features/users/hooks.ts";
import { PATHS } from "../../shared/paths.ts";

export default function GuestRoute() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { data: session } = useSession();

  return session ? (
    <Navigate
      to={
        searchParams.get("next") ?? location.state?.from ?? PATHS.algorithm.list
      }
      replace
    />
  ) : (
    <Outlet />
  );
}
