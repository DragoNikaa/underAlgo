export function truncateText(text: string, maxLength = 250) {
  if (text.length <= maxLength) {
    return text;
  }

  const cutIndex = text.lastIndexOf(" ", maxLength);
  const truncated = text
    .slice(0, cutIndex > 0 ? cutIndex : maxLength)
    .replace(/[\s.,!?;:…]+$/, "");

  return `${truncated}…`;
}
