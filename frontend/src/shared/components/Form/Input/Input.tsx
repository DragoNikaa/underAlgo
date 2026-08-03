import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import formStyles from "../Form.module.css";
import inputStyles from "./Input.module.css";

interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  column?: boolean;
}

export default function Input({
  type = "text",
  column = false,
  children,
  ...rest
}: InputProps) {
  return (
    <label className={clsx(formStyles.label, column && inputStyles.column)}>
      {children}
      <input type={type} className={inputStyles.input} {...rest} />
    </label>
  );
}
