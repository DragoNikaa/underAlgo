import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../../../shared/components/Button/Button.tsx";
import Drawer from "../../../../shared/components/Drawer/Drawer.tsx";
import Logo from "../../../../shared/components/Logo/Logo.tsx";
import { PATHS } from "../../../../shared/paths.ts";
import Nav from "./Nav.tsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      <Link to={PATHS.algorithm.list}>
        <Logo />
      </Link>

      <nav aria-label="main">
        <div className="showDesktop">
          <Nav />
        </div>

        <div className="showMobile">
          <Button onClick={() => setIsNavOpen(true)}>☰</Button>

          <Drawer
            side="right"
            isOpen={isNavOpen}
            onClose={() => setIsNavOpen(false)}
          >
            <Nav onNavigate={() => setIsNavOpen(false)} />
          </Drawer>
        </div>
      </nav>
    </div>
  );
}
