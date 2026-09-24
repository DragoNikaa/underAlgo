export const PATHS = {
  user: {
    signup: "/signup/",
    login: "/login/",
    resetPassword: "/reset-password/",

    provider: {
      callback: "/provider-callback/",
      completeSignup: "/complete-signup/",
    },
  },

  algorithm: {
    list: "/algorithms/",
    detail: (slug: string) => `/algorithms/${slug}/`,
    comments: (slug: string) => PATHS.algorithm.detail(slug) + "comments/",
  },
};
