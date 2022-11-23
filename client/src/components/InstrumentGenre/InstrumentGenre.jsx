import styles from "./InstrumentGenre.module.css";

const InstrumentGenre = ({ title, deleteInstrumentGenre }) => {
  return (
    <div className={styles.instrument_genre}>
      <span>{title}</span>
      <button
        type="button"
        className={styles.delete_genre}
        onClick={deleteInstrumentGenre}
        data-value={title}
      >
        &#10006;
      </button>
    </div>
  );
};

export default InstrumentGenre;
