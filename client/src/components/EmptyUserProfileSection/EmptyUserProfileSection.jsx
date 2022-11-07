import styles from "./EmptyUserProfileSection.module.css";

const EmptyUserProfileSection = ({ heading, text, cta }) => {
  return (
    <div className={styles.bottom_row}>
      <h5 className={styles.label}>{heading}</h5>
      <p className={styles.explanation}>{text}</p>
      <button className={styles.info_cta_btn}>{cta}</button>
    </div>
  );
};

export default EmptyUserProfileSection;
