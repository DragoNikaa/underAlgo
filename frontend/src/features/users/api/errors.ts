import { ApiError } from "../../../shared/api/errors.ts";

export function isNotAuthenticatedError(error: unknown) {
  return error instanceof ApiError && error.status === 401;
}

export function isConflictError(error: unknown) {
  return error instanceof ApiError && error.status === 409;
}

type AllauthValidationErrorItem = {
  message: string;
  code: string;
  param?: string;
};

export class AllauthValidationError extends ApiError {
  readonly errors: Record<string, string>;

  constructor(errors: AllauthValidationErrorItem[]) {
    super(400, "django-allauth validation error");
    this.name = "AllauthValidationError";
    this.errors = this.parseErrors(errors);
  }

  private parseErrors(
    errors: AllauthValidationErrorItem[],
  ): Record<string, string> {
    return Object.fromEntries(
      errors
        .filter(({ param }) => param !== undefined)
        .map(({ param, message }) => [param, message]),
    );
  }
}

export function isAllauthValidationErrorResponse(
  error: unknown,
): error is ApiError & {
  data: { errors: AllauthValidationErrorItem[] };
} {
  return (
    error instanceof ApiError &&
    error.status === 400 &&
    typeof error.data === "object" &&
    error.data !== null &&
    "errors" in error.data &&
    Array.isArray(error.data.errors)
  );
}
