import type { RouteObject } from "react-router-dom";

import CompleteSignupPage from "./pages/CompleteSignupPage.tsx";
import LoginPage from "./pages/LoginSignupPages/LoginPage.tsx";
import SignupPage from "./pages/LoginSignupPages/SignupPage.tsx";
import ProviderCallbackPage from "./pages/ProviderCallbackPage.tsx";
import RequestPasswordPage from "./pages/RequestPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage.tsx";

export const userRoutes: RouteObject[] = [
  {
    path: "provider-callback",
    element: <ProviderCallbackPage />,
  },
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
