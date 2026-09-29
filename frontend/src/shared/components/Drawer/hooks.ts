import { useEffect } from "react";

export function useDrawerEffects(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const closeOnKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key == "Enter") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnKeydown);
    };
  }, [isOpen, onClose]);
}
