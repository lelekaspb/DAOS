import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const Footer = () => {
  const { userInfo } = useGlobalContext();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.footer_heading}>MUSIK SAMSPIL</div>
          <div className={styles.footer_nav}>
            <Link to="/posts" className={styles.footer_nav_link}>
              Se opslag
            </Link>
            <Link to="/orchestras" className={styles.footer_nav_link}>
              Finde ensemble
            </Link>
            {userInfo.token.length > 0 && (
              <Link to="/profile" className={styles.footer_nav_link}>
                Profil
              </Link>
            )}
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
