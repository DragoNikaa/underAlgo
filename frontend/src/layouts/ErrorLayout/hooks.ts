import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { ApiError } from "../../shared/api/errors.ts";

export function useErrorInfo() {
  const error = useRouteError();

  let title = "unexpected error";
  let message = "Something went wrong. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `error ${error.status}`;
    message = error.data.replace("Error: ", "");
  } else if (error instanceof ApiError) {
    title = `error ${error.status}`;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return { title, message: ensureTrailingPeriod(message) };
}

function ensureTrailingPeriod(text: string) {
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}
