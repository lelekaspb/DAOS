import styles from "./FrontPage.module.css";

const FrontPageContent = ({
  instrument1,
  instrument2,
  instrument3,
  // instrument4,
  instrument5,
  handleSelect,
  handleSubmit,
}) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.musicInstruments}>
        <form onSubmit={handleSubmit}>
          <select
            id="instruments"
            name="instruments"
            className={styles.select}
            onChange={handleSelect}
          >
            <option className={styles.name} value="all">
              Vælg instrument
            </option>
            <option className={styles.name} value={instrument1}>
              {instrument1}
            </option>
            <option className={styles.name} value={instrument2}>
              {instrument2}
            </option>
            <option className={styles.name} value={instrument3}>
              {instrument3}
            </option>
            {/* <option className={styles.name} value={instrument4}>
              {instrument4}
            </option> */}
            <option className={styles.name} value={instrument5}>
              {instrument5}
            </option>
          </select>
          <button type="submit" className={styles.seOpslag_btn}>
            Se Opslag
          </button>
        </form>
      </div>
    </div>
  );
};

export default FrontPageContent;
