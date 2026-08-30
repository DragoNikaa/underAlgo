export const ENDPOINTS = {
  csrf: "/api/csrf/",

  user: {
    signup: "/_allauth/browser/v1/auth/signup",
  },

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
