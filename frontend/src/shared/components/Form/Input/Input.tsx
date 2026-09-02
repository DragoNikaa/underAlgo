import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import formStyles from "../Form.module.css";
import inputStyles from "./Input.module.css";

export type InputType =
  "text" | "email" | "password" | "search" | "tel" | "url" | "number";

interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  type?: InputType;
  column?: boolean;
  withoutLabel?: boolean;
}

export default function Input({
  type = "text",
  column = false,
  withoutLabel = false,
  children,
  ...rest
}: InputProps) {
  const input = (
    <>
      {children}
      <input type={type} className={inputStyles.input} {...rest} />
    </>
  );

  return withoutLabel ? (
    input
  ) : (
    <label className={clsx(formStyles.label, column && inputStyles.column)}>
      {input}
    </label>
  );
}
