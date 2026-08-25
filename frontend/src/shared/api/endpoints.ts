export const ENDPOINTS = {
  algorithm: {
    list: "/api/algorithms/",
    detail: (slug: string) => `/api/algorithms/${slug}/`,
    execution: (slug: string) => `/api/algorithms/${slug}/execute/`,
  },

  difficulty: {
    list: "/api/difficulties/",
  },

  category: {
    list: "/api/categories/",
  },
};
