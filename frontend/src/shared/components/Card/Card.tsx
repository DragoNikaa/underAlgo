import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Card.module.css";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  scrollable?: boolean;
}

export default function Card({
  scrollable = false,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={clsx(styles.card, scrollable && styles.scrollable, className)}
    >
      {children}
    </div>
  );
}
