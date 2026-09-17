import type { ComponentPropsWithoutRef } from "react";

import styles from "./Form.module.css";

type TextAreaProps = ComponentPropsWithoutRef<"textarea">;

export default function TextArea({ ...rest }: TextAreaProps) {
  return <textarea className={styles.field} {...rest} />;
}
