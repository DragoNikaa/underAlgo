export function parseBody(
  body: Record<string, string>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, parseInputValue(value)]),
  );
}

function parseInputValue(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
