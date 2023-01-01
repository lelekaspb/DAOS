import styles from "./AddInstrument.module.css";
import BackLink from "../BackLink/BackLink";
import InstrumentGenre from "../InstrumentGenre/InstrumentGenre";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const AddInstrument = () => {
  const { userInfo, setUserInfo } = useGlobalContext();

  if (!userInfo.token.length) {
    return <Navigate to="/login" replace />;
  }

  const [instrumentData, setInstrumentData] = useState({
    title: "",
    genres: [],
  });

  const [errors, setErrors] = useState({
    title: { haserror: false, message: "" },
    genres: { haserror: false, message: "" },
  });

  const handleSelect = (event) => {
    const select = event.target;
    if (select.name == "instrument") {
      setInstrumentData({
        ...instrumentData,
        title: select.value,
      });
    } else if (select.name == "genres") {
      // check if the genre is already in the array
      const genreExists = instrumentData.genres.find(
        (genre) => genre === select.value
      );
      if (!genreExists && select.value.length > 0) {
        setInstrumentData({
          ...instrumentData,
          genres: instrumentData.genres.concat(select.value),
        });
        select.value = "";
      }
    }
  };

  let navigate = useNavigate();
  const redirectToProfile = () => {
    navigate("/profile");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: add select validation - do not send fetch request unless both selects are filled in
    postInstrument();
  };

  const postInstrument = async () => {
    const url = `http://127.0.0.1:3007/user/${userInfo.id}/instrument`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(instrumentData),
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();
      if (data.success) {
        // add the instrument to instrument array in userInfo state
        setUserInfo({
          ...userInfo,
          instruments: data.user.instruments,
        });

        // redirect to profile page
        redirectToProfile();
      } else {
        // check status code

        // if 403 - instrument exists
        if (data.status == 403) {
          setErrors((prevState) => {
            return {
              ...prevState,
              title: {
                haserror: true,
                message: data.message,
              },
            };
          });
        } // if 422 - dto validation failed
        else if (data.statusCode == 422) {
          // reset state so that errors that were fixed after previous query are gone
          setErrors((prevState) => {
            return {
              ...prevState,
              title: {
                haserror: false,
                message: "",
              },
              genres: {
                haserror: false,
                message: "",
              },
            };
          });

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
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInstrumentGenre = (event) => {
    event.preventDefault();
    const genreToDelete = event.target.dataset.value;
    const indexOfgenreToDelete = instrumentData.genres.findIndex(
      (item) => item === genreToDelete
    );
    if (indexOfgenreToDelete > -1) {
      const firstPart = instrumentData.genres.slice(0, indexOfgenreToDelete);
      const lastPart = instrumentData.genres.slice(
        indexOfgenreToDelete + 1,
        instrumentData.genres.length
      );

      setInstrumentData({
        ...instrumentData,
        ...instrumentData.genres,
        genres: [...firstPart, ...lastPart],
      });
    }
  };

  const listOfGenres = instrumentData.genres.map((genre) => (
    <InstrumentGenre
      title={genre}
      key={genre}
      deleteGenre={deleteInstrumentGenre}
    />
  ));

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile" />
        <h2 className={styles.page_heading}>Tilføj instrument</h2>
        <form className={styles.add_instrument_form} onSubmit={handleSubmit}>
          <div className={styles.select_instrument_field}>
            <select
              id="instrument"
              name="instrument"
              value={instrumentData.instrument}
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
                errors.title.haserror ? "shown" : "hidden"
              }`}
            >
              {errors.title.message}
            </span>
          </div>
          <div className={styles.genre_form_field}>
            <label className={styles.label} htmlFor="genres">
              Genre
            </label>
            <select
              id="genres"
              name="genres"
              // value={instrumentData.genres[0]}
              className={styles.select}
              // required
              onChange={handleSelect}
            >
              <option value="">Vælg genre</option>
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
            <div className={styles.instrument_genres}>{listOfGenres}</div>
          </div>
          <div className={styles.submit_field}>
            <button type="submit" className={styles.submit_btn}>
              Tilføj instrument
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddInstrument;
