import styles from "./Instrument.module.css";
import InstrumentGenre from "../InstrumentGenre/InstrumentGenre";

const Instrument = ({ title, genres, deleteGenre = null }) => {
  const listOfGenres = genres.map((genre, index) => (
    <InstrumentGenre
      title={genre}
      key={`${genre}_${index}`}
      data-value={genre}
      instrument={title}
      deleteGenre={deleteGenre}
    />
  ));

  return (
    <article className={styles.instrument}>
      <h4 className={styles.instrument_heading}>{title}</h4>
      <div className={styles.instrument_genres}>{listOfGenres}</div>
    </article>
  );
};

export default Instrument;
