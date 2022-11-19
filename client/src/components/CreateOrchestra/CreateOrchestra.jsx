import BackLink from "../BackLink/BackLink";
import FormField from "../FormField/FormField";
import InstrumentGenre from "../InstrumentGenre/InstrumentGenre";
import styles from "./CreateOrchestra.module.css";

const CreateOrchestra = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/UserProfile/:id" />
        <h2 className={styles.page_heading}>Opret ensemble</h2>
        <form className={styles.create_orchestra_form}>
          {/* name field */}
          <FormField name="name" type="text" text="Ensemblets navn" />

          {/* picture field */}
          <div className={styles.picture_field}>
            <span className={styles.label}>Coverbillede</span>
            <img
              src="./../../assets/placeholder-rectangle.png"
              className={styles.picture}
              alt="cover picture"
            />
            <button className={styles.upload_btn}>Upload coverbillede</button>
            <span className={styles.help_block}></span>
          </div>

          {/* description field */}
          <div className={styles.description_field}>
            <label className={styles.label} htmlFor="description">
              Beskrivelse
            </label>
            <textarea
              className={styles.description_input}
              placeholder="Skriv en kort beskrivelse af jeres emsemble eller orkester..."
            ></textarea>
            <span className={styles.help_block}></span>
          </div>

          {/* website field */}
          <FormField name="website" type="text" text="Hjemmeside" />

          {/* location fields */}
          <div className={styles.location_field}>
            <FormField name="zip_code" text="Postnummer" type="text" />
            <FormField name="city" text="By" type="text" />
          </div>

          {/* amount of musitians field */}
          <div className={styles.musitians_amount_form_field}>
            <label className={styles.label} htmlFor="select_musitians_amount">
              Antal aktive musikere
            </label>
            <select
              id="select_musitians_amount"
              name="select_musitians_amount"
              defaultValue="vælg"
              className={styles.select}
            >
              <option value="vælg">Vælg antal</option>
              <option value="1-4">1 - 4 musikere</option>
              <option value="5-9">5 - 9 musikere</option>
              <option value="10-24">10 - 24 musikere</option>
              <option value="25-49">25 - 49 musikere</option>
              <option value="50">Mere end 50 musikere</option>
            </select>
            <span className={styles.help_block}></span>
          </div>

          {/* frequency of practice field */}
          <div className={styles.frequency_form_field}>
            <label className={styles.label} htmlFor="select_frequency">
              Øvefrekvens
            </label>
            <select
              id="select_frequency"
              name="select_frequency"
              defaultValue="vælg"
              className={styles.select}
            >
              <option value="vælg">Vælg frekvens</option>
              <option value="few_times_a_week">Flere gange om ugen</option>
              <option value="once_a_week">1 gang om ugen</option>
              <option value="once_two_weeks">1 gang hver anden uge</option>
              <option value="once_a_month">1 gang om måneden</option>
              <option value="once_two_months">1 gang hver anden måned</option>
            </select>
            <span className={styles.help_block}></span>
          </div>

          {/* genres field */}
          <div className={styles.genres_form_field}>
            <label className={styles.label} htmlFor="select_genre">
              Genrer
            </label>
            <select
              id="select_genre"
              name="select_genre"
              defaultValue="vælg"
              className={styles.select}
            >
              <option value="vælg">Genrer</option>
              <option value="Kammermusik">Kammermusik</option>
              <option value="Symfonik">Symfonik</option>
              <option value="Romantisk">Romantisk</option>
              <option value="Barok">Barok</option>
              <option value="Folkemusik">Folkemusik</option>
              <option value="Senmoderne">Senmoderne</option>
              <option value="Senromantisk">Senromantisk</option>
            </select>
            <div className={styles.selected_genres}>
              <InstrumentGenre title="Kammermusik" />
              <InstrumentGenre title="Barok" />
            </div>
            <span className={styles.help_block}></span>
          </div>

          {/* submit field */}
          <div className={styles.submit_field}>
            <button className={styles.submit_btn}>Opret ensemble</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateOrchestra;
