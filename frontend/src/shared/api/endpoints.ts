const ALLAUTH_BASE_URL = "/_allauth/browser/v1/auth";

const algorithmsUrl = "/api/algorithms/";
const algorithmUrl = (slug: string) => algorithmsUrl + slug + "/";

const commentsUrl = (algorithmSlug: string) =>
  algorithmUrl(algorithmSlug) + "comments/";
const commentUrl = (algorithmSlug: string, id: number) =>
  commentsUrl(algorithmSlug) + id + "/";

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
    list: algorithmsUrl,
    detail: algorithmUrl,
    execute: (slug: string) => algorithmUrl(slug) + "execute/",

    difficulties: algorithmsUrl + "difficulties/",
    categories: algorithmsUrl + "categories/",
  },

  comment: {
    list: commentsUrl,
    detail: commentUrl,
    like: (algorithmSlug: string, id: number) =>
      commentUrl(algorithmSlug, id) + "like/",

    replies: (algorithmSlug: string, commentId: number) =>
      commentUrl(algorithmSlug, commentId) + "replies/",
  },
};
