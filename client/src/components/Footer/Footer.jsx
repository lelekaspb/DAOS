import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.footer_heading}>MUSIK SAMSPIL</div>
          <div className={styles.footer_nav}>
            <a href="#" className={styles.footer_nav_link}>
              Se opslag
            </a>
            <Link to="/orchestras" className={styles.footer_nav_link}>
              Finde ensemble
            </Link>
            <Link to="/profile" className={styles.footer_nav_link}>
              Profil
            </Link>
          </div>
          <div className={styles.footer_some}>
            <div>is</div>
            <div>fb</div>
            <div>in</div>
          </div>
        </div>
        <div className={styles.music}></div>
        <div className={styles.brand}></div>
      </div>
      <div className={styles.privacy}>Privatlivspolitik</div>
    </footer>
  );
};

export default Footer;
