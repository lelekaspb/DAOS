import styles from "./AddInstrument.module.css";
import BackLink from "../BackLink/BackLink";

const AddInstrument = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink />
        <h2 className={styles.page_heading}>Tilføj instrument</h2>
        <form className={styles.add_instrument_form}>
          <div className={styles.select_instrument_field}>
            <select
              id="select_instrument"
              name="select_instrument"
              defaultValue="vælg"
              className={styles.select}
            >
              <option defaultValue value="vælg">
                Vælg instrument
              </option>
              <option value="Piano">Piano</option>
              <option value="Flute">Flute</option>
              <option value="Drums">Drums</option>
              <option value="Guitar">Guitar</option>
            </select>
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.genre_form_field}>
            <label className={styles.label} htmlFor="select_genre">
              Genre
            </label>
            <select
              id="select_genre"
              name="select_genre"
              defaultValue="vælg"
              className={styles.select}
            >
              <option value="vælg">Vælg genre</option>
              <option value="Kammermusik">Kammermusik</option>
              <option value="Symfonik">Symfonik</option>
              <option value="Romantisk">Romantisk</option>
              <option value="Barok">Barok</option>
              <option value="Folkemusik">Folkemusik</option>
              <option value="Senmoderne">Senmoderne</option>
              <option value="Senromantisk">Senromantisk</option>
            </select>
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.submit_field}>
            <button className={styles.submit_btn}>Tilføj instrument</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddInstrument;
