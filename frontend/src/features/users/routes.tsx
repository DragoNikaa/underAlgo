import type { RouteObject } from "react-router-dom";

import CompleteSignupPage from "./pages/CompleteSignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RequestPasswordPage from "./pages/RequestPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage.tsx";

export const userRoutes: RouteObject[] = [
  {
    path: "verify-email/:key",
    element: <VerifyEmailPage />,
  },
];

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
        element: <RequestPasswordPage />,
      },
      {
        path: "key/:key",
        element: <ResetPasswordPage />,
      },
    ],
  },
];
