import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Card.module.css";

type CardProps = ComponentPropsWithoutRef<"div">;

export default function Card({ className, children }: CardProps) {
  return <div className={clsx(styles.card, className)}>{children}</div>;
}
