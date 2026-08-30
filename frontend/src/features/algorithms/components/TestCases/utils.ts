import { ParseError } from "./errors.ts";

export function parseBody(body: Record<string, string>) {
  const invalidFields: string[] = [];
  const parsedBody: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(body)) {
    if (!value.trim()) continue;

    try {
      parsedBody[key] = JSON.parse(value);
    } catch {
      invalidFields.push(key);
    }
  }

  if (invalidFields.length > 0) {
    throw new ParseError(invalidFields);
  }

  return parsedBody;
}
