import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Heading.module.css";

interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "primary" | "secondary";
}

export default function Heading({
  as: Tag = "h1",
  variant = "primary",
  className,
  children,
}: HeadingProps) {
  return (
    <Tag className={clsx(styles.heading, styles[variant], className)}>
      {children}
    </Tag>
  );
}
