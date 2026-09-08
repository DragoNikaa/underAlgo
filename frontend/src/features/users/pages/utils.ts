export function getPasswordMatchError(
  password1?: string,
  password2?: string,
): string | undefined {
  if (password1 !== password2) {
    return "Passwords do not match.";
  }
}
