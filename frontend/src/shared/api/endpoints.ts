export const ENDPOINTS = {
  csrf: "/api/csrf/",

  user: {
    signup: "/_allauth/browser/v1/auth/signup",
    login: "/_allauth/browser/v1/auth/login",

    provider: {
      redirect: "/_allauth/browser/v1/auth/provider/redirect",
      signup: "/_allauth/browser/v1/auth/provider/signup",
    },
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
