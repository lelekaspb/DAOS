import styles from "./Orchestra.module.css";
import { Link } from "react-router-dom";

const Orchestra = ({ linkTo, title }) => {
  return (
    <Link className={styles.orchestra_link} to={linkTo}>
      <article className={styles.orchestra}>
        <img
          className={styles.orchestra_picture}
          src="./../../assets/placeholder-rectangle.png"
          alt="cover picture"
        />
        <div className={styles.orchestra_title}>
          <h4 className={styles.orchestra_title_heading}>{title}</h4>
        </div>
      </article>
    </Link>
  );
};

export default Orchestra;
