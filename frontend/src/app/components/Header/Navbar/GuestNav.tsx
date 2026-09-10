import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import styles from "./Navbar.module.css";

interface GuestNavProps {
  onNavigate?: () => void;
}

export default function GuestNav({ onNavigate }: GuestNavProps) {
  return (
    <ul className={styles.userNav}>
      <li>
        <ButtonLink
          to={PATHS.user.login}
          onClick={onNavigate}
          oval
          color="blue"
          className={styles.userNavItem}
        >
          log in
        </ButtonLink>
      </li>

      <li>
        <ButtonLink
          to={PATHS.user.signup}
          onClick={onNavigate}
          oval
          color="blueInverse"
          className={styles.userNavItem}
        >
          sign up
        </ButtonLink>
      </li>
    </ul>
  );
}
