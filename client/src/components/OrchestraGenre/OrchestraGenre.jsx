import styles from "./OrchestraGenre.module.css";

const OrchestraGenre = ({ title }) => {
  return (
    <div className={styles.orchestra_genre}>
      <span>{title}</span>
    </div>
  );
};

export default OrchestraGenre;
