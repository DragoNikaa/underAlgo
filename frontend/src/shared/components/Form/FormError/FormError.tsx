import type { ComponentPropsWithoutRef } from "react";

import styles from "./FormError.module.css";

type FormErrorProps = ComponentPropsWithoutRef<"p">;

export default function FormError({ children, ...rest }: FormErrorProps) {
  return (
    <p className={styles.formError} {...rest}>
      {children}
    </p>
  );
}
