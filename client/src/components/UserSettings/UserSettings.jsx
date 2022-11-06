import BackLink from "../BackLink/BackLink";
import FormField from "../FormField/FormField";
import styles from "./UserSettings.module.css";

const UserSettings = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink />
        <h2 className={styles.page_heading}>Indstillinger</h2>
        <form className={styles.change_password_form}>
          <h3 className={styles.page_subheading}>Adgangskode</h3>
          <FormField
            name="current_password"
            text="Nuværende adgangskode"
            type="password"
          />

          <FormField
            name="new_password"
            text="Nyt adgangskode"
            type="password"
          />

          <div className={styles.change_password_submit_field}>
            <button className={styles.change_password_submit_btn}>
              Skift adgangskode
            </button>
          </div>
        </form>
        <form className={styles.delete_profile_form}>
          <h3 className={styles.page_subheading}>Profil</h3>
          <button className={styles.delete_profile_submit_btn}>
            Slet profil
          </button>
        </form>
      </section>
    </main>
  );
};

export default UserSettings;
