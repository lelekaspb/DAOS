import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.nav_left}>
          <span className={styles.logo}>Musik Samspil</span>
          <span className={styles.description}>
            Skabt af DAOS - Dansk Amatørorkester Samvirke
          </span>
        </div>
        <div className={styles.nav_right}>
          <ul>
            <li className={styles.nav_link}>
              <a href="#">Opslag</a>
            </li>
            <li className={styles.nav_link}>
              <a href="#">Profil</a>
            </li>
            <li>
              <a href="#" className={styles.nav_btn_signup}>
                Opret bruger
              </a>
            </li>
            <li>
              <a href="#" className={styles.nav_btn_login}>
                Log ind
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
