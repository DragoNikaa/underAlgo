import type { ComponentPropsWithoutRef } from "react";

import styles from "./Form.module.css";

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type">;

export default function Checkbox({ children, ...rest }: CheckboxProps) {
  return (
    <label className={styles.label}>
      <input type="checkbox" className={styles.checkbox} {...rest} />
      {children}
    </label>
  );
}
