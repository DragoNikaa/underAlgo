export const PATHS = {
  user: {
    signup: "/signup/",
    login: "/login/",
  },

  algorithm: {
    list: "/algorithms/",
    detail: (slug: string) => `/algorithms/${slug}/`,
  },
};
