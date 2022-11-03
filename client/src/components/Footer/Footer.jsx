import styles from "./Footer.module.css";

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
            <a href="#" className={styles.footer_nav_link}>
              Profil
            </a>
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
