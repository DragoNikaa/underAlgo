export function stringify(value: unknown) {
  return JSON.stringify(value).replaceAll(",", ", ").replaceAll(":", ": ");
}
