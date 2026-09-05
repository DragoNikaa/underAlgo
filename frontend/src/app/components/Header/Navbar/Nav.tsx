import { useSession } from "../../../../features/users/hooks.ts";
import AuthenticatedNav from "./AuthenticatedNav.tsx";
import GuestNav from "./GuestNav.tsx";
import styles from "./Navbar.module.css";
import NavLinks from "./NavLinks.tsx";

interface NavProps {
  onNavigate?: () => void;
}

export default function Nav({ onNavigate }: NavProps) {
  const { data: session } = useSession();
  const username = session?.data.user.username;

  return (
    <div className={styles.nav}>
      <NavLinks onNavigate={onNavigate} />

      {username ? (
        <AuthenticatedNav username={username} onNavigate={onNavigate} />
      ) : (
        <GuestNav onNavigate={onNavigate} />
      )}
    </div>
  );
}
