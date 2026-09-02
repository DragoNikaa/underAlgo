import type { RouteObject } from "react-router-dom";

import CompleteSignupPage from "./pages/CompleteSignupPage/CompleteSignupPage.tsx";
import SignupPage from "./pages/SignupPage/SignupPage.tsx";

export const userRoutes: RouteObject[] = [
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "complete-signup",
    element: <CompleteSignupPage />,
  },
];
