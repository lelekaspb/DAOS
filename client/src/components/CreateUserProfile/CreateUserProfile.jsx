import styles from "./CreateUserProfile.module.css";

const CreateUserProfile = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Opret profil</h2>
        <form className={styles.form} autoComplete="off">
          <div className={styles.name_fields}>
            <div className={styles.first_name_field}>
              <label className={styles.label} htmlFor="first_name">
                Fornavn
              </label>
              <input
                type="text"
                className={`${styles.first_name_input} ${styles.error}`}
                name="first_name"
                id="first_name"
                placeholder="Fornavn"
              />
              <span className={styles.help_block}>
                This field cannot be empty
              </span>
            </div>
            <div className={styles.last_name_field}>
              <label className={styles.label} htmlFor="last_name">
                Efternavn
              </label>
              <input
                type="text"
                className={styles.last_name_input}
                name="last_name"
                id="last_name"
                placeholder="Efternavn"
              />
              <span className={styles.help_block}></span>
            </div>
          </div>
          <div className={styles.email_field}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              className={styles.email_input}
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.password_field}>
            <label className={styles.label} htmlFor="password">
              Adgangskode
            </label>
            <input
              type="password"
              className={styles.password_input}
              name="password"
              id="password"
              placeholder="Adgangskode"
            />
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.submit_field}>
            <button className={styles.submit_btn}>Opret profil</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateUserProfile;
