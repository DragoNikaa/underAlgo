import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: "large";
  oval?: boolean;
  color?: "blue" | "blueInverse" | "green" | "yellow" | "red";
}

export default function Button({
  type = "button",
  size,
  oval = false,
  color,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        size && styles[size],
        oval && styles.oval,
        color && styles[color],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
