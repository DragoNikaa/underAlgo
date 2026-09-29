import type { RouteObject } from "react-router-dom";

import CompleteSignupPage from "./pages/auth/CompleteSignupPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import EmailVerificationPage from "./pages/email/EmailVerificationPage.tsx";
import EmailVerificationSentPage from "./pages/email/EmailVerificationSentPage.tsx";
import PasswordRequestPage from "./pages/password/PasswordRequestPage/PasswordRequestPage.tsx";
import PasswordResetPage from "./pages/password/PasswordResetPage.tsx";
import ProviderCallbackPage from "./pages/ProviderCallbackPage.tsx";

export const userRoutes: RouteObject[] = [
  {
    path: "email/verify",
    children: [
      {
        path: "sent",
        element: <EmailVerificationSentPage />,
      },
      {
        path: "key/:key",
        element: <EmailVerificationPage />,
      },
    ],
  },
  {
    path: "password/reset/key/:key",
    element: <PasswordResetPage />,
  },
  {
    path: "provider/callback",
    element: <ProviderCallbackPage />,
  },
];

export const userGuestRoutes: RouteObject[] = [
  {
    path: "signup",
    children: [
      {
        index: true,
        element: <SignupPage />,
      },
      {
        path: "complete",
        element: <CompleteSignupPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "password/reset",
    element: <PasswordRequestPage />,
  },
];
