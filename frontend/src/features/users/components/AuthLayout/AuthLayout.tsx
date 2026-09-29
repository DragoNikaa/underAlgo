import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import Card from "../../../../shared/components/Card/Card.tsx";
import styles from "./AuthLayout.module.css";

type AuthLayoutProps = ComponentPropsWithoutRef<"div">;

export default function AuthLayout({ className, children }: AuthLayoutProps) {
  return (
    <main>
      <Card className={clsx(styles.authLayout, className)}>{children}</Card>
    </main>
  );
}
