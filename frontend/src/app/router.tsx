import { createBrowserRouter } from "react-router-dom";

import { algorithmRoutes } from "../features/algorithms/routes.tsx";
import { userRoutes } from "../features/users/routes.tsx";
import ErrorLayout from "../layouts/ErrorLayout/ErrorLayout.tsx";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [...algorithmRoutes, ...userRoutes],
  },
]);
