import AuthMenu from "./AuthMenu.tsx";
import styles from "./Navbar.module.css";
import NavLinks from "./NavLinks.tsx";

interface NavProps {
  onNavigate?: () => void;
}

export default function Nav({ onNavigate }: NavProps) {
  return (
    <div className={styles.nav}>
      <NavLinks onNavigate={onNavigate} />
      <AuthMenu onNavigate={onNavigate} />
    </div>
  );
}
