import styles from "./WelcomeUser.module.css";
import { Link } from "react-router-dom";

const WelcomeUser = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Velkommen Susanne!</h2>
        <p className={styles.explain_text}>
          Tilføj de instrumenter du kan spille på for at fædiggøre din profil.
        </p>

        <Link className={styles.finish_profile_btn} to="/EditProfile/:id">
          Fædiggøre profil
        </Link>

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
