import FormField from "../FormField/FormField";
import BackLink from "../BackLink/BackLink";
import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const CreatePost = () => {
  const { userInfo, setUserInfo } = useGlobalContext();

  const [postData, setPostData] = useState({
    title: "",
    type: "looking",
    instrument: "",
    description: "",
    location: "",
    orchestraName: "",
    website: "",
    creator_id: userInfo.id,
  });

  const initialErrorsState = {
    title: {
      haserror: false,
      message: "",
    },
    type: {
      haserror: false,
      message: "",
    },
    instrument: {
      haserror: false,
      message: "",
    },
    description: {
      haserror: false,
      message: "",
    },
    location: {
      haserror: false,
      message: "",
    },
    orchestraName: {
      haserror: false,
      message: "",
    },
    website: {
      haserror: false,
      message: "",
    },
  };

  const [errors, setErrors] = useState(initialErrorsState);

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

  let navigate = useNavigate();
  const redirectToProfile = () => {
    navigate("/profile");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: add client-side validation
    createPost();
  };

  const createPost = async () => {
    const url = `http://127.0.0.1:3007/post`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(postData),
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();

      // reset errors atate in order to hide errors from previous query that might have been fixed in this one
      setErrors(initialErrorsState);

      // check response
      if (data.error) {
        // if 422 - update errors state
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
      } else if (data.success) {
        // if post created, update userInfo state
        setUserInfo((prevState) => {
          return {
            ...prevState,
            ["posts"]: [...prevState.posts, data.post],
          };
        });

        // and redirect to profile page
        redirectToProfile();
      } else {
        // if sth unforseen happens, console log it
        console.log("sth went wrong");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile" />
        <h2 className={styles.page_heading}>Opret opslag</h2>
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
            value={postData.region}
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
              Opret opslag
            </button>
          </div>
          {/* submit end */}
        </form>
      </section>
    </main>
  );
};

export default CreatePost;

// name,
//   type,
//   text,
//   handleInput,
//   value,
