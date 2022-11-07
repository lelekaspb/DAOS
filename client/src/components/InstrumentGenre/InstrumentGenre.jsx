import styles from "./InstrumentGenre.module.css";

const InstrumentGenre = ({ title }) => {
  return (
    <div className={styles.instrument_genre}>
      <span>{title}</span>
      <button className={styles.delete_genre}>&#10006;</button>
    </div>
  );
};

export default InstrumentGenre;
