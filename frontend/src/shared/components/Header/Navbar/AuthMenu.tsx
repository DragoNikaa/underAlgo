import { PATHS } from "../../../paths.ts";
import ButtonLink from "../../Button/ButtonLink.tsx";
import styles from "./Navbar.module.css";

interface AuthMenuProps {
  onNavigate?: () => void;
}

export default function AuthMenu({ onNavigate }: AuthMenuProps) {
  return (
    <ul className={styles.authMenu}>
      <li>
        <ButtonLink
          to={PATHS.user.login}
          onClick={onNavigate}
          oval
          color="blue"
          className={styles.authMenuItem}
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
          className={styles.authMenuItem}
        >
          sign up
        </ButtonLink>
      </li>
    </ul>
  );
}
