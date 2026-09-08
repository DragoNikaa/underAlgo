export const ENDPOINTS = {
  csrf: "/api/csrf/",

  user: {
    session: "/_allauth/browser/v1/auth/session",
    signup: "/_allauth/browser/v1/auth/signup",
    login: "/_allauth/browser/v1/auth/login",

    password: {
      request: "/_allauth/browser/v1/auth/password/request",
      reset: "/_allauth/browser/v1/auth/password/reset",
    },

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
