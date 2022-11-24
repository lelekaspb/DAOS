import { Link } from "react-router-dom";
import styles from "./EmptyUserProfileSection.module.css";

const EmptyUserProfileSection = ({ heading, text, cta, linkTo }) => {
  return (
    <div className={styles.bottom_row}>
      <h5 className={styles.label}>{heading}</h5>
      <p className={styles.explanation}>{text}</p>
      <Link to={linkTo}>
        <button className={styles.info_cta_btn}>{cta}</button>
      </Link>
    </div>
  );
};

export default EmptyUserProfileSection;
