export const ENDPOINTS = {
  algorithm: {
    list: "/api/algorithms",
    detail: (slug: string) => `/api/algorithms/${slug}`,
  },

  difficulty: {
    list: "/api/difficulties",
  },

  category: {
    list: "/api/categories",
  },
};
