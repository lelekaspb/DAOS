import { useState } from "react";
import BackLink from "../BackLink/BackLink";
import FormField from "../FormField/FormField";
import InstrumentGenre from "../InstrumentGenre/InstrumentGenre";
import styles from "./CreateOrchestra.module.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const CreateOrchestra = () => {
  const { userInfo, setUserInfo } = useGlobalContext();

  if (!userInfo.token.length) {
    return <Navigate to="/login" replace />;
  }

  const initialOrchestraState = {
    title: "",
    creator_id: userInfo.id,
    description: "",
    website: "",
    zipcode: "",
    city: "",
    musicians_amount: "",
    practice_frequency: "",
    genres: [],
  };

  const [orchestraData, setOrchestraData] = useState(initialOrchestraState);

  const initialErrorsState = {
    title: {
      haserror: false,
      message: "",
    },
    description: {
      haserror: false,
      message: "",
    },
    website: {
      haserror: false,
      message: "",
    },
    zipcode: {
      haserror: false,
      message: "",
    },
    city: {
      haserror: false,
      message: "",
    },
    musicians_amount: {
      haserror: false,
      message: "",
    },
    practice_frequency: {
      haserror: false,
      message: "",
    },
    genres: {
      haserror: false,
      message: "",
    },
  };

  const [errors, setErrors] = useState(initialErrorsState);

  const handleInput = (event) => {
    const property = event.target.name;
    const propertyValue = event.target.value;

    setOrchestraData({
      ...orchestraData,
      [property]: propertyValue,
    });
  };

  const handleGenreInput = (event) => {
    const select = event.target;
    // check if the genre is already in the array
    const genreExists = orchestraData.genres.find(
      (genre) => genre === select.value
    );
    if (!genreExists && select.value.length > 0) {
      setOrchestraData({
        ...orchestraData,
        genres: orchestraData.genres.concat(select.value),
      });
      select.value = "";
    }
  };

  const deleteOrchestraGenre = (event) => {
    event.preventDefault();
    const genreToDelete = event.target.dataset.value;
    const indexOfgenreToDelete = orchestraData.genres.findIndex(
      (item) => item === genreToDelete
    );
    if (indexOfgenreToDelete > -1) {
      const firstPart = orchestraData.genres.slice(0, indexOfgenreToDelete);
      const lastPart = orchestraData.genres.slice(
        indexOfgenreToDelete + 1,
        orchestraData.genres.length
      );

      setOrchestraData({
        ...orchestraData,
        ...orchestraData.genres,
        genres: [...firstPart, ...lastPart],
      });
    }
  };

  const listOfGenres = orchestraData.genres.map((genre) => (
    <InstrumentGenre
      title={genre}
      key={genre}
      deleteGenre={deleteOrchestraGenre}
    />
  ));

  let navigate = useNavigate();
  const redirectToProfile = () => {
    navigate("/profile");
  };

  const postOrchestra = async () => {
    const url = `http://127.0.0.1:3007/orchestra`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(orchestraData),
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();
      if (data.success) {
        // update userInfo state so it has the newly created orchestra
        setUserInfo({
          ...userInfo,
          orchestras_created: data.user.orchestras_created,
        });
        // redirect to profile page
        redirectToProfile();
      } else if (data.error) {
        // reset errors atate in order to hide errors from previous query that might have been fixed in this one
        setErrors(initialErrorsState);

        // change errors state so that the errors in DOM are displayed
        data.message.forEach((msg) => {
          const property = msg.property;
          const message = msg.constraints[Object.keys(msg.constraints)[0]];
          setErrors((prevState) => {
            return {
              ...prevState,
              [property]: {
                ...prevState[property],
                haserror: true,
                message: message,
              },
            };
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postOrchestra();
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile" />
        <h2 className={styles.page_heading}>Opret ensemble</h2>
        <form className={styles.create_orchestra_form} onSubmit={handleSubmit}>
          {/* name field */}
          <FormField
            name="title"
            type="text"
            text="Ensemblets navn"
            handleInput={handleInput}
            value={orchestraData.title}
            hasError={errors.title.haserror}
            errorMessage={errors.title.message}
          />

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
              name="description"
              id="description"
              onChange={handleInput}
              value={orchestraData.description}
            />
            <span
              className={`${styles.help_block} ${
                errors.description.haserror ? "shown" : "hidden"
              }`}
            >
              {errors.description.message}
            </span>
          </div>

          {/* website field */}
          <FormField
            name="website"
            type="text"
            text="Hjemmeside"
            handleInput={handleInput}
            value={orchestraData.website}
            hasError={errors.website.haserror}
            errorMessage={errors.website.message}
          />

          {/* location fields */}
          <div className={styles.location_field}>
            <FormField
              name="zipcode"
              text="Postnummer"
              type="text"
              handleInput={handleInput}
              value={orchestraData.zipcode}
              hasError={errors.zipcode.haserror}
              errorMessage={errors.zipcode.message}
            />
            <FormField
              name="city"
              text="By"
              type="text"
              handleInput={handleInput}
              value={orchestraData.city}
              hasError={errors.city.haserror}
              errorMessage={errors.city.message}
            />
          </div>

          {/* amount of musitians field */}
          <div className={styles.musitians_amount_form_field}>
            <label className={styles.label} htmlFor="musicians_amount">
              Antal aktive musikere
            </label>
            <select
              id="musicians_amount"
              name="musicians_amount"
              className={styles.select}
              onChange={handleInput}
              value={orchestraData.musicians_amount}
            >
              <option value="">Vælg antal</option>
              <option value="1 - 4 musikere">1 - 4 musikere</option>
              <option value="5 - 9 musikere">5 - 9 musikere</option>
              <option value="10 - 24 musikere">10 - 24 musikere</option>
              <option value="25 - 49 musikere">25 - 49 musikere</option>
              <option value="Mere end 50 musikere">Mere end 50 musikere</option>
            </select>
            <span
              className={`${styles.help_block} ${
                errors.musicians_amount.haserror ? "shown" : "hidden"
              }`}
            >
              {errors.musicians_amount.message}
            </span>
          </div>

          {/* frequency of practice field */}
          <div className={styles.frequency_form_field}>
            <label className={styles.label} htmlFor="practice_frequency">
              Øvefrekvens
            </label>
            <select
              id="practice_frequency"
              name="practice_frequency"
              className={styles.select}
              onChange={handleInput}
              value={orchestraData.practice_frequency}
            >
              <option value="">Vælg frekvens</option>
              <option value="Flere gange om ugen">Flere gange om ugen</option>
              <option value="1 gang om ugen">1 gang om ugen</option>
              <option value="1 gang hver anden uge">
                1 gang hver anden uge
              </option>
              <option value="1 gang om måneden">1 gang om måneden</option>
              <option value="1 gang hver anden måned">
                1 gang hver anden måned
              </option>
            </select>
            <span
              className={`${styles.help_block} ${
                errors.practice_frequency.haserror ? "shown" : "hidden"
              }`}
            >
              {errors.practice_frequency.message}
            </span>
          </div>

          {/* genres field */}
          <div className={styles.genres_form_field}>
            <label className={styles.label} htmlFor="genre">
              Genrer
            </label>
            <select
              id="genre"
              name="genre"
              defaultValue="vælg"
              className={styles.select}
              onChange={handleGenreInput}
            >
              <option value="">Genrer</option>
              <option value="Kammermusik">Kammermusik</option>
              <option value="Symfonik">Symfonik</option>
              <option value="Romantisk">Romantisk</option>
              <option value="Barok">Barok</option>
              <option value="Folkemusik">Folkemusik</option>
              <option value="Senmoderne">Senmoderne</option>
              <option value="Senromantisk">Senromantisk</option>
            </select>
            <span
              className={`${styles.help_block} ${
                errors.genres.haserror ? "shown" : "hidden"
              }`}
            >
              {errors.genres.message}
            </span>
            <div className={styles.selected_genres}>
              {" "}
              {listOfGenres}
              {/* <InstrumentGenre title="Kammermusik" />
              <InstrumentGenre title="Barok" /> */}
            </div>
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
