import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Button.module.css";

export type ButtonColor = "blue" | "blueInverse" | "green" | "yellow" | "red";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: "small" | "large";
  oval?: boolean;
  color?: ButtonColor;
  iconButton?: boolean;
}

export default function Button({
  type = "button",
  size,
  oval = false,
  color,
  iconButton = false,
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
        iconButton && styles.iconButton,
        color && styles[color],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
