import type { RouteObject } from "react-router-dom";

import CommentListPage from "./pages/CommentListPage/CommentListPage.tsx";

export const commentRoutes: RouteObject[] = [
  {
    path: "algorithms/:slug/comments",
    children: [
      {
        index: true,
        element: <CommentListPage />,
      },
    ],
  },
];
