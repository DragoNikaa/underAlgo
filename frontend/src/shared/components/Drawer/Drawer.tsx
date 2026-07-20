import clsx from "clsx";
import { type ComponentPropsWithoutRef } from "react";

import Button from "../Button/Button.tsx";
import styles from "./Drawer.module.css";
import { useLockBodyAndEscape } from "./hooks.ts";

interface DrawerProps extends ComponentPropsWithoutRef<"aside"> {
  side: "left" | "right";
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({
  side,
  isOpen,
  onClose,
  className,
  children,
}: DrawerProps) {
  useLockBodyAndEscape(isOpen, onClose);

  return (
    <>
      <aside
        className={clsx(
          styles.drawer,
          styles[side],
          isOpen && styles.open,
          className,
        )}
      >
        <Button onClick={onClose} color="red" className={styles.closeButton}>
          X
        </Button>
        {children}
      </aside>

      {isOpen && <div onClick={onClose} className={styles.overlay} />}
    </>
  );
}
