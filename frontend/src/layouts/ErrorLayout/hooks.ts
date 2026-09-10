import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { isAllauthValidationErrorResponse } from "../../features/users/api/errors.ts";
import { isDRFApiErrorResponse } from "../../shared/api/errors.ts";

export function useErrorInfo() {
  const error = useRouteError();

  return {
    title: getErrorTitle(error),
    message: getErrorMessage(error),
  };
}

function getErrorTitle(error: unknown) {
  return hasStatus(error) ? `error ${error.status}` : "unexpected error";
}

function hasStatus(error: unknown) {
  return typeof error === "object" && error !== null && "status" in error;
}

function getErrorMessage(error: unknown) {
  let message = "Something went wrong. Please try again.";

  if (isRouteErrorResponse(error)) {
    message = error.data.replace("Error: ", "");
  } else if (isDRFApiErrorResponse(error)) {
    message = error.data.detail;
  } else if (isAllauthValidationErrorResponse(error)) {
    message = error.data.errors[0].message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return ensureTrailingPeriod(message);
}

function ensureTrailingPeriod(text: string) {
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}
