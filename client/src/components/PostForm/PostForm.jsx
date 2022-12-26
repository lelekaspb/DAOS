import FormField from "../FormField/FormField";
import styles from "./PostForm.module.css";

const PostForm = ({ handleSubmit, setPostData, postData, errors, action }) => {
  const handleInput = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setPostData((prevState) => {
      return {
        ...prevState,
        [property]: value,
      };
    });
  };

  const handleSelect = (event) => {
    const select = event.target;
    setPostData((prevState) => {
      return {
        ...prevState,
        instrument: select.value,
      };
    });
  };

  return (
    <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
      {/* title */}
      <FormField
        name="title"
        type="text"
        text="Titel"
        handleInput={handleInput}
        value={postData.title}
        hasError={errors.title.haserror}
        errorMessage={errors.title.message}
        placeholderText="Titel (max 120 karakterer)"
      />
      {/* title end */}

      {/* type */}
      <div className={styles.form_field}>
        <span className={styles.label}>Opslag type</span>
        <p className={styles.explanation}>
          Vælg om du <strong>spiller</strong> på et instrument, eller om du{" "}
          <strong>søger</strong> en der spiller instrumentet.
        </p>
        <div className={styles.options}>
          <div className={styles.option_wrapper} onChange={handleInput}>
            <input
              type="radio"
              id="play"
              name="type"
              value="play"
              checked={postData.type === "play"}
              onChange={handleInput}
            />
            <label htmlFor="play">Jeg spiller på...</label>
          </div>
          <div className={styles.option_wrapper}>
            <input
              type="radio"
              id="looking"
              name="type"
              value="looking"
              checked={postData.type === "looking"}
              onChange={handleInput}
            />
            <label htmlFor="play">Jeg søger en der spiller på...</label>
          </div>
        </div>
        <span
          className={`${styles.help_block} ${
            errors.type.haserror ? "shown" : "hidden"
          }`}
        >
          {errors.type.message}
        </span>
      </div>
      {/* type end */}

      {/* instrument */}
      <div className={styles.form_field}>
        <span className={styles.label}>Instrument</span>
        <select
          id="instrument"
          name="instrument"
          value={postData.instrument}
          className={styles.select}
          // required={true}
          onChange={handleSelect}
        >
          <option defaultValue value="">
            Vælg instrument
          </option>
          <option value="Piano">Piano</option>
          <option value="Flute">Flute</option>
          <option value="Drums">Drums</option>
          <option value="Guitar">Guitar</option>
        </select>
        <span
          className={`${styles.help_block} ${
            errors.instrument.haserror ? "shown" : "hidden"
          }`}
        >
          {errors.instrument.message}
        </span>
      </div>
      {/* instrument end */}

      {/* description */}
      <div className={styles.form_field}>
        <label className={styles.label} htmlFor="description">
          Beskrivelse
        </label>
        <p className={styles.explanation}>
          Her kan du beskrive detaljer om hvad eller hvem du søger med dette
          opslag.
        </p>
        <textarea
          className={styles.description_input}
          placeholder="Skriv en beskrivelse..."
          name="description"
          onChange={handleInput}
          value={postData.description}
        />
        <span
          className={`${styles.help_block} ${
            errors.description.haserror ? "shown" : "hidden"
          }`}
        >
          {errors.description.message}
        </span>
      </div>
      {/* description end */}

      {/* location */}
      <FormField
        name="location"
        type="text"
        text="Område"
        handleInput={handleInput}
        value={postData.location}
        hasError={errors.location.haserror}
        errorMessage={errors.location.message}
        placeholderText="By, postnr. eller adresse"
      />
      {/* location end */}

      {/* orchestra name */}
      <FormField
        name="orchestraName"
        type="text"
        text="Gruppe/ensemblenavn"
        handleInput={handleInput}
        value={postData.orchestraName}
        hasError={errors.orchestraName.haserror}
        errorMessage={errors.orchestraName.message}
        placeholderText="Skriv navnet her"
      />
      {/* orchestra name end */}

      {/* website */}
      <FormField
        name="website"
        type="text"
        text="Hjemmeside"
        handleInput={handleInput}
        value={postData.website}
        hasError={errors.website.haserror}
        errorMessage={errors.website.message}
        placeholderText="Indsæt link"
      />
      {/* website end */}

      {/* submit */}
      <div className={styles.submit_field}>
        <button type="submit" className={styles.submit_btn}>
          <span>{action}</span> opslag
        </button>
      </div>
      {/* submit end */}
    </form>
  );
};

export default PostForm;
