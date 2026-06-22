import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>Q</span>
          <span>QuickShip</span>
        </Link>

        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Track
          </Link>
        </div>
      </nav>
    </header>
  );
}
