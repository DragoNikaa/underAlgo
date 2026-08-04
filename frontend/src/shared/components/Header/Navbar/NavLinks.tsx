import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { PATHS } from "../../../paths.ts";
import buttonStyles from "../../Button/Button.module.css";
import navbarStyles from "./Navbar.module.css";
import styles from "./Navbar.module.css";

interface NavLinksProps {
  onNavigate?: () => void;
}

export default function NavLinks({ onNavigate }: NavLinksProps) {
  const links = [
    { to: PATHS.algorithm.list, label: "algorithms" },
    { to: "/about", label: "about" },
    { to: "/contact", label: "contact" },
  ];

  return (
    <ul className={styles.navLinks}>
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                buttonStyles.button,
                buttonStyles.oval,
                navbarStyles.navLink,
                isActive && navbarStyles.navLinkActive,
              )
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
