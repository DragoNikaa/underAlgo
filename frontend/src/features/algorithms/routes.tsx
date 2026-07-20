import type { RouteObject } from "react-router-dom";

import AlgorithmDetailPage from "./pages/AlgorithmDetailPage/AlgorithmDetailPage.tsx";
import AlgorithmListPage from "./pages/AlgorithmListPage/AlgorithmListPage.tsx";

export const algorithmRoutes: RouteObject[] = [
  {
    path: "algorithms",
    children: [
      {
        index: true,
        element: <AlgorithmListPage />,
      },
      {
        path: ":slug",
        element: <AlgorithmDetailPage />,
      },
    ],
  },
];
