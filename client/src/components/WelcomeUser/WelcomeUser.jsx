import styles from "./WelcomeUser.module.css";

const WelcomeUser = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Velkommen Susanne!</h2>
        <p className={styles.explain_text}>
          Tilføj de instrumenter du kan spille på for at fædiggøre din profil.
        </p>
        <a href="#" className={styles.finish_profile_btn}>
          Fædiggøre profil
        </a>
        <div className={styles.search_links}>
          <a href="#" className={styles.seach_btn}>
            Find musiker
          </a>
          <a href="#" className={styles.seach_btn}>
            Find ensemble
          </a>
        </div>
      </section>
    </main>
  );
};

export default WelcomeUser;
