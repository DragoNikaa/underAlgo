export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ValidationErrors = {
  [key: string]: string[] | ValidationErrors;
};

export class ValidationError extends ApiError {
  readonly errors: ValidationErrors;

  constructor(errors: ValidationErrors) {
    super(400, "Validation error");
    this.name = "ValidationError";
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

  private getMessages(errors: ValidationErrors): string[] {
    return Object.entries(errors).flatMap(([key, error]) => {
      if (Array.isArray(error)) {
        return error.map((message) => `At index ${key}: ${message}`);
      }

      return this.getMessages(error);
    });
  }
}
