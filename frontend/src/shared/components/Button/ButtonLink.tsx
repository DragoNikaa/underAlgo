import clsx from "clsx";
import { Link, type LinkProps } from "react-router-dom";

import styles from "./Button.module.css";

interface ButtonLinkProps extends LinkProps {
  size?: "large";
  oval?: boolean;
  color?: "blue" | "blueInverse" | "green" | "yellow" | "red";
}

export default function ButtonLink({
  size,
  oval = false,
  color,
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
        color && styles[color],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
