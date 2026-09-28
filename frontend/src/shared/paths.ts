export const PATHS = {
  user: {
    signup: "/signup/",
    login: "/login/",

    email: {
      verificationSent: "/email/verify/sent/",
    },

    password: {
      reset: "/password/reset/",
    },

    provider: {
      callback: "/provider/callback/",
      completeSignup: "/signup/complete/",
    },
  },

  algorithm: {
    list: "/algorithms/",
    detail: (slug: string) => `/algorithms/${slug}/`,
    comments: (slug: string) => PATHS.algorithm.detail(slug) + "comments/",
  },
};
