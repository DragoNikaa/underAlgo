export const PATHS = {
  user: {
    signup: "/signup/",
    login: "/login/",
    resetPassword: "/reset-password/",

    provider: {
      completeSignup: "/complete-signup/",
    },
  },

  algorithm: {
    list: "/algorithms/",
    detail: (slug: string) => `/algorithms/${slug}/`,
  },
};
