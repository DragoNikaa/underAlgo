export const ENDPOINTS = {
  csrf: "/api/csrf/",

  user: {
    session: "/_allauth/browser/v1/auth/session",
    signup: "/_allauth/browser/v1/auth/signup",
    login: "/_allauth/browser/v1/auth/login",
    verifyEmail: "/_allauth/browser/v1/auth/email/verify",

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
    execution: (slug: string) => ENDPOINTS.algorithm.detail(slug) + "execute/",
  },

  difficulty: {
    list: "/api/difficulties/",
  },

  category: {
    list: "/api/categories/",
  },

  comment: {
    list: (algorithmSlug: string) =>
      ENDPOINTS.algorithm.detail(algorithmSlug) + "comments/",
    replies: (algorithmSlug: string, commentId: number) =>
      ENDPOINTS.comment.list(algorithmSlug) + `${commentId}/replies/`,
  },
};
