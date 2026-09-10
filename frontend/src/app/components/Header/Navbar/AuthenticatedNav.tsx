import { useLogout } from "../../../../features/users/hooks.ts";
import Button from "../../../../shared/components/Button/Button.tsx";
import ButtonLink from "../../../../shared/components/Button/ButtonLink.tsx";
import styles from "./Navbar.module.css";

interface AuthenticatedNavProps {
  username: string;
  onNavigate?: () => void;
}

export default function AuthenticatedNav({
  username,
  onNavigate,
}: AuthenticatedNavProps) {
  const { mutate: logout, isPending } = useLogout();

  return (
    <ul className={styles.userNav}>
      <li>
        <ButtonLink
          to={`/users/${username}/`}
          onClick={onNavigate}
          oval
          color="blue"
          className={styles.userNavItem}
        >
          {username}
        </ButtonLink>
      </li>

      <li>
        <Button
          onClick={() => logout()}
          disabled={isPending}
          oval
          color="blueInverse"
          className={styles.userNavItem}
        >
          log out
        </Button>
      </li>
    </ul>
  );
}
