export const PATHS = {
  user: {
    signup: "/signup/",
    login: "/login/",

    provider: {
      completeSignup: "/complete-signup/",
    },
  },

  algorithm: {
    list: "/algorithms/",
    detail: (slug: string) => `/algorithms/${slug}/`,
  },
};
