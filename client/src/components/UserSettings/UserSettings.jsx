import styles from "./UserSettings.module.css";

const UserSettings = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.back_link_container}>
          <a className={styles.back_link}>Tilbage</a>
        </div>
        <h2 className={styles.page_heading}>Indstillinger</h2>
        <form className={styles.change_password_form}>
          <h3 className={styles.page_subheading}>Adgangskode</h3>
          <div className={styles.current_password_field}>
            <label className={styles.label} htmlFor="current_password">
              Nuværende adgangskode
            </label>
            <input
              type="password"
              className={styles.current_password_input}
              name="current_password"
              id="current_password"
              placeholder="Nuværende adgangskode"
            />
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.new_password_field}>
            <label className={styles.label} htmlFor="new_password">
              Nyt adgangskode
            </label>
            <input
              type="password"
              className={styles.new_password_input}
              name="new_password"
              id="new_password"
              placeholder="Nyt adgangskode"
            />
            <span className={styles.help_block}></span>
          </div>
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
