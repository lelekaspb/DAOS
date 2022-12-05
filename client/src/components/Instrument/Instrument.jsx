import styles from "./Instrument.module.css";
import InstrumentGenre from "../InstrumentGenre/InstrumentGenre";

const Instrument = ({ title, genres, deleteGenre = null }) => {
  const listOfGenres = genres.map((genre) => (
    <InstrumentGenre
      title={genre}
      key={genre}
      // deleteGenre={deleteGenre}
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
