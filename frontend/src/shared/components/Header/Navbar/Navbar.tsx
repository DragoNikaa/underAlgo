import { useState } from "react";
import { Link } from "react-router-dom";

import { PATHS } from "../../../paths.ts";
import Button from "../../Button/Button.tsx";
import Drawer from "../../Drawer/Drawer.tsx";
import Logo from "../../Logo/Logo.tsx";
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
