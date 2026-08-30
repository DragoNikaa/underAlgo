import { DRFValidationError } from "../../../../shared/api/errors.ts";

export class ParseError extends Error {
  readonly invalidFields: string[];

  constructor(invalidFields: string[]) {
    super("Failed to parse request body");
    this.name = "ParseError";
    this.invalidFields = invalidFields;
  }
}

export function getFieldErrors(
  error: ParseError | DRFValidationError | null,
  field: string,
) {
  if (error instanceof ParseError && error.invalidFields.includes(field)) {
    return ["Invalid format. Algorithm confused."];
  }
  if (error instanceof DRFValidationError) {
    return error.getFieldErrors(field);
  }
  return [];
}
