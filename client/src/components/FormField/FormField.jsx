import styles from "./FormField.module.css";

const FormField = ({
  name,
  type,
  text,
  handleInput,
  value,
  isRequired = false,
  hasError = false,
  errorMessage = "",
  placeholderText = null,
}) => {
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
        // placeholder={text}
        placeholder={placeholderText ? placeholderText : text}
        onChange={handleInput}
        value={value}
        required={isRequired}
      />
      <span className={`${styles.help_block} ${hasError ? "shown" : "hidden"}`}>
        {errorMessage}
      </span>
    </div>
  );
};

export default FormField;
