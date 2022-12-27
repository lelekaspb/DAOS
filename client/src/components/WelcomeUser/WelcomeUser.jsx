import styles from "./WelcomeUser.module.css";
import { Link, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const WelcomeUser = () => {
  const { userInfo } = useGlobalContext();
  if (!userInfo.token.length) {
    return <Navigate to="/login" replace />;
  }
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>
          Velkommen <span>{userInfo.firstName}</span>
        </h2>
        <p className={styles.explain_text}>
          Tilføj de instrumenter du kan spille på for at fædiggøre din profil.
        </p>

        <Link className={styles.finish_profile_btn} to="/edit-profile">
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
