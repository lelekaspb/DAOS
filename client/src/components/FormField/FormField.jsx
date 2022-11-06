import styles from "./FormField.module.css";

const FormField = ({ name, type, text }) => {
  return (
    <div className={styles.form_field}>
      <label className={styles.label} htmlFor={name}>
        {text}
      </label>
      <input
        type={type}
        className={styles.input}
        name={name}
        id={name}
        placeholder={text}
      />
      <span className={styles.help_block}></span>
    </div>
  );
};

export default FormField;
