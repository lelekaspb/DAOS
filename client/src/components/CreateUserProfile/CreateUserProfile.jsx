import FormField from "../FormField/FormField";
import styles from "./CreateUserProfile.module.css";

const CreateUserProfile = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Opret profil</h2>
        <form className={styles.form} autoComplete="off">
          <div className={styles.name_fields}>
            <FormField name="first_name" text="Fornavn" type="text" />
            <FormField name="last_name" type="text" text="Efternavn" />
          </div>
          <FormField name="email" type="email" text="E-mail" />

          <FormField name="password" type="password" text="Adgangskode" />

          <div className={styles.submit_field}>
            <button className={styles.submit_btn}>Opret profil</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateUserProfile;
