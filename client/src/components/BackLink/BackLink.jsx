import styles from "./BackLink.module.css";
import { Link } from "react-router-dom";

const BackLink = ({ component, state = null }) => {
  return (
    <div className={styles.back_link_container}>
      <Link className={styles.back_link} to={component} state={state}>
        Tilbage
      </Link>
    </div>
  );
};

export default BackLink;
