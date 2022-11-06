import styles from "./BackLink.module.css";

const BackLink = () => {
  return (
    <div className={styles.back_link_container}>
      <a className={styles.back_link}>Tilbage</a>
    </div>
  );
};

export default BackLink;
