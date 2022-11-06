import styles from "./EmptyUserProfileSection.module.css";

const EmptyUserProfileSection = ({ heading, text, type }) => {
  return (
    <div className={styles.bottom_row}>
      <h5 className={styles.label}>{heading}</h5>
      <p className={styles.membership_explanation}>{text}</p>
      <button className={styles.info_cta_btn}>Opret {type}</button>
    </div>
  );
};

export default EmptyUserProfileSection;
