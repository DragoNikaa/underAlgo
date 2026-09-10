import { createBrowserRouter } from "react-router-dom";

import { algorithmRoutes } from "../../features/algorithms/routes.tsx";
import { userGuestRoutes, userRoutes } from "../../features/users/routes.tsx";
import ErrorLayout from "../../layouts/ErrorLayout/ErrorLayout.tsx";
import MainLayout from "../../layouts/MainLayout/MainLayout.tsx";
import GuestRoute from "./GuestRoute.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...algorithmRoutes,
      ...userRoutes,
      {
        element: <GuestRoute />,
        children: [...userGuestRoutes],
      },
    ],
  },
]);
