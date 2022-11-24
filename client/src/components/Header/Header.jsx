import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.nav_left}>
          <Link to="/" className={styles.logo_link}>
            <span className={styles.logo}>Musik Samspil</span>{" "}
          </Link>
          <span className={styles.description}>
            Skabt af DAOS - Dansk Amatørorkester Samvirke
          </span>
        </div>

        <div className={styles.nav_right}>
          <ul>
            <li className={styles.nav_link}>
              <Link to="/orchestras">Ensembler</Link>
            </li>
            <li className={styles.nav_link}>
              <Link to="/">Opslag</Link>
            </li>
            <li className={styles.nav_link}>
              <Link to="/profile">Profil</Link>
            </li>
            <li>
              <Link to="/create-profile" className={styles.nav_btn_signup}>
                Opret bruger
              </Link>
            </li>
            <li>
              <Link to="/login" className={styles.nav_btn_login}>
                Log ind
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
