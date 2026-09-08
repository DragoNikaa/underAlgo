import type { RouteObject } from "react-router-dom";

import CompleteSignupPage from "./pages/CompleteSignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RequestPassword from "./pages/RequestPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import SignupPage from "./pages/SignupPage.tsx";

export const userGuestRoutes: RouteObject[] = [
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
  {
    path: "reset-password",
    children: [
      {
        index: true,
        element: <RequestPassword />,
      },
      {
        path: "key/:key",
        element: <ResetPassword />,
      },
    ],
  },
];
