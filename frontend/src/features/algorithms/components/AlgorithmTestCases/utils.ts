import { ValidationError } from "../../../../shared/api/errors.ts";

export function parseBody(body: Record<string, string>) {
  const errors: Record<string, string[]> = {};
  const parsedBody: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(body)) {
    try {
      parsedBody[key] = JSON.parse(value);
    } catch {
      errors[key] = ["Invalid format. Algorithm confused."];
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  return parsedBody;
}
