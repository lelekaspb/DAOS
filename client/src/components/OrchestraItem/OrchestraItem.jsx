import styles from "./OrchestraItem.module.css";

const OrchestraItem = ({ title, zipcode, city, website, isMember }) => {
  return (
    <article className={styles.orchestra}>
      <img
        className={styles.orchestra_picture}
        src="./../../assets/placeholder-rectangle.png"
        alt="cover picture"
      />
      <div className={styles.orchestra_title}>
        <h4 className={styles.orchestra_title_heading}>{title}</h4>
      </div>
      <div className={styles.orchestra_details}>
        <span className={styles.orchestra_address}>
          {zipcode}&nbsp;{city}
        </span>
        <span className={styles.orchestra_website}>{website}</span>
      </div>
      <div className={styles.membership}>
        {isMember && (
          <button className={styles.leave_orchestra}>Forlade ensemblet</button>
        )}
        {!isMember && (
          <button className={styles.become_member}>Bliv medlem</button>
        )}
      </div>
    </article>
  );
};

export default OrchestraItem;
