import clsx from "clsx";
import { useEffect } from "react";

import styles from "./Loader.module.css";

interface LoaderProps {
  overlay?: boolean;
}

export default function Loader({ overlay = false }: LoaderProps) {
  useEffect(() => {
    if (!overlay) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [overlay]);

  return (
    <div className={clsx(styles.wrapper, overlay && styles.overlay)}>
      <svg viewBox="0 0 100 100" className={styles.loader}>
        <defs>
          <linearGradient
            id="loaderGradient"
            gradientUnits="userSpaceOnUse"
            x1="10"
            y1="86.2"
            x2="90"
            y2="40"
          >
            <stop offset="30%" className={styles.stop1} />
            <stop offset="60%" className={styles.stop2} />
            <stop offset="75%" className={styles.stop2} />
            <stop offset="105%" className={styles.stop3} />
          </linearGradient>
        </defs>

        <path
          d="M70,15.36 L90,50 L70,84.64 L30,84.64 L10,50 L30,15.36 Z"
          className={styles.hexagon}
        />
      </svg>
    </div>
  );
}
