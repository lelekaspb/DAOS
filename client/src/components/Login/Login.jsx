import FormField from "../FormField/FormField";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Log Ind</h2>
        <form className={styles.login_form}>
          <div className={styles.row}>
            <FormField name="login_email" text="E-mail" type="email" />
            <FormField name="login_password" text="Adgangskode" />
          </div>
          <div className={styles.submit_field}>
            <button className={styles.submit_btn}>Log Ind</button>
          </div>
        </form>
        <a href="#" className={styles.forgotten_password}>
          Glemt adgangskode?
        </a>
      </section>
    </main>
  );
};

export default Login;
