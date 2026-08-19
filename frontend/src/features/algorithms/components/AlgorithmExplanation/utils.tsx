import { algorithmVariableColors } from "../../config/variable-colors.ts";

export function styleVariables(text: string, algorithmSlug: string) {
  const variableColors = algorithmVariableColors[algorithmSlug];

  return text.split(/(\[\[.+?]])/g).map((part, index) => {
    if (!part.startsWith("[[") || !part.endsWith("]]")) {
      return part;
    }

    const variable = part.slice(2, -2);
    const color = variableColors[variable];

    return (
      <strong key={index} className={color}>
        {variable}
      </strong>
    );
  });
}
