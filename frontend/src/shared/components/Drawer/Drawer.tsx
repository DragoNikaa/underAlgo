import clsx from "clsx";
import { X } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";

import Button from "../Button/Button.tsx";
import styles from "./Drawer.module.css";
import { useDrawerEffects } from "./hooks.ts";

interface DrawerProps extends ComponentPropsWithoutRef<"aside"> {
  side: "left" | "right";
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export default function Drawer({
  side,
  isOpen,
  onClose,
  name,
  className,
  children,
}: DrawerProps) {
  useDrawerEffects(isOpen, onClose);

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
        <Button
          onClick={onClose}
          aria-label={`close ${name}`}
          iconButton
          color="red"
          className={styles.closeButton}
        >
          <X />
        </Button>

        {children}
      </aside>

      {isOpen && <div onClick={onClose} className={styles.overlay} />}
    </>
  );
}
