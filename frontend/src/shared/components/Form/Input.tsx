import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Form.module.css";

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
      <input type={type} className={styles.field} {...rest} />
    </>
  );

  return withoutLabel ? (
    input
  ) : (
    <label className={clsx(styles.label, column && styles.column)}>
      {input}
    </label>
  );
}
