const ALLAUTH_BASE_URL = "/_allauth/browser/v1/auth";

export const ENDPOINTS = {
  csrf: "/api/csrf/",

  user: {
    session: `${ALLAUTH_BASE_URL}/session`,
    signup: `${ALLAUTH_BASE_URL}/signup`,
    login: `${ALLAUTH_BASE_URL}/login`,

    email: {
      verify: `${ALLAUTH_BASE_URL}/email/verify`,
    },

    password: {
      request: `${ALLAUTH_BASE_URL}/password/request`,
      reset: `${ALLAUTH_BASE_URL}/password/reset`,
    },

    provider: {
      redirect: `${ALLAUTH_BASE_URL}/provider/redirect`,
      signup: `${ALLAUTH_BASE_URL}/provider/signup`,
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
    create: (algorithmSlug: string) =>
      ENDPOINTS.algorithm.detail(algorithmSlug) + "comments/",
    update: (algorithmSlug: string, id: number) =>
      ENDPOINTS.algorithm.detail(algorithmSlug) + `comments/${id}/`,
    delete: (algorithmSlug: string, id: number) =>
      ENDPOINTS.algorithm.detail(algorithmSlug) + `comments/${id}/`,
    like: (algorithmSlug: string, id: number) =>
      ENDPOINTS.algorithm.detail(algorithmSlug) + `comments/${id}/like/`,

    replies: {
      list: (algorithmSlug: string, commentId: number) =>
        ENDPOINTS.comment.list(algorithmSlug) + `${commentId}/replies/`,
      create: (algorithmSlug: string, commentId: number) =>
        ENDPOINTS.comment.create(algorithmSlug) + `${commentId}/replies/`,
    },
  },
};
