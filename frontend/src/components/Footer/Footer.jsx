import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          &copy; {currentYear} QuickShip Courier Tracking
        </p>

        <div className={styles.meta}>
          <span>Reliable parcel updates</span>
          <span className={styles.dot} aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
