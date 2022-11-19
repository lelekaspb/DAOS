import styles from "./BackLink.module.css";
import { Link } from "react-router-dom";

const BackLink = ({ component }) => {
  return (
    <div className={styles.back_link_container}>
      {/* <a className={styles.back_link}>Tilbage</a> */}
      <Link className={styles.back_link} to={component}>
        Tilbage
      </Link>
    </div>
  );
};

export default BackLink;
