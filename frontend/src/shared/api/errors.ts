export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;

  constructor(status: number, data: unknown) {
    super(`Request failed with status ${status}`);
    this.name = "ApiError";

    this.status = status;
    this.data = data;
  }
}

export function isDRFApiErrorResponse(error: unknown): error is ApiError & {
  data: { detail: string };
} {
  return (
    error instanceof ApiError &&
    typeof error.data === "object" &&
    error.data !== null &&
    "detail" in error.data &&
    typeof error.data.detail === "string"
  );
}

type DRFValidationErrors = {
  [key: string]: string[] | DRFValidationErrors;
};

export class DRFValidationError extends ApiError {
  readonly errors: DRFValidationErrors;

  constructor(errors: DRFValidationErrors) {
    super(400, "Django REST Framework validation error");
    this.name = "DRFValidationError";
    this.errors = errors;
  }

  getFieldErrors(key: string): string[] {
    const errors = this.errors[key];

    if (!errors) {
      return [];
    }

    if (Array.isArray(errors)) {
      return errors;
    }

    return this.getMessages(errors);
  }

  private getMessages(errors: DRFValidationErrors): string[] {
    return Object.entries(errors).flatMap(([key, error]) => {
      if (Array.isArray(error)) {
        return error.map((message) => `At index ${key}: ${message}`);
      }

      return this.getMessages(error);
    });
  }
}

export function isDRFValidationErrorResponse(
  error: unknown,
): error is ApiError & {
  data: DRFValidationErrors;
} {
  return (
    error instanceof ApiError &&
    error.status === 400 &&
    typeof error.data === "object" &&
    error.data !== null &&
    !("detail" in error.data)
  );
}
