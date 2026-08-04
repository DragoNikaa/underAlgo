import type { ComponentPropsWithoutRef } from "react";

import styles from "./Form.module.css";

type RadioProps = Omit<ComponentPropsWithoutRef<"input">, "type">;

export default function Radio({ children, ...rest }: RadioProps) {
  return (
    <label className={styles.label}>
      <input type="radio" className={styles.radio} {...rest} />
      {children}
    </label>
  );
}
