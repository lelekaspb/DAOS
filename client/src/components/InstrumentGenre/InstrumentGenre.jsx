import styles from "./InstrumentGenre.module.css";

const InstrumentGenre = ({ title, instrument, deleteGenre }) => {
  return (
    <div className={styles.instrument_genre}>
      <span>{title}</span>

      <button
        type="button"
        className={styles.delete_genre}
        onClick={deleteGenre}
        data-value={title}
        data-instrument={instrument}
      >
        &#10006;
      </button>
    </div>
  );
};

export default InstrumentGenre;
