import type { RouteObject } from "react-router-dom";

import SignupPage from "./pages/SignupPage/SignupPage.tsx";

export const userRoutes: RouteObject[] = [
  {
    path: "signup",
    element: <SignupPage />,
  },
];
