import type { RouteObject } from "react-router-dom";

import CompleteSignupPage from "./pages/CompleteSignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";

export const userRoutes: RouteObject[] = [
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "complete-signup",
    element: <CompleteSignupPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];
