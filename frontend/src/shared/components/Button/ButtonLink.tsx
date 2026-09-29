import clsx from "clsx";
import { Link, type LinkProps } from "react-router-dom";

import styles from "./Button.module.css";
import type { ButtonColor } from "./Button.tsx";

interface ButtonLinkProps extends LinkProps {
  size?: "small" | "large";
  oval?: boolean;
  color?: ButtonColor;
  iconButton?: boolean;
}

export default function ButtonLink({
  size,
  oval = false,
  color,
  iconButton = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
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
    </Link>
  );
}
