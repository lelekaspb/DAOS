import FormField from "../FormField/FormField";
import styles from "./CreateUserProfile.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const initialErrorsState = {
    firstName: {
      haserror: false,
      message: "",
    },
    lastName: {
      haserror: false,
      message: "",
    },
    email: {
      haserror: false,
      message: "",
    },
    password: {
      haserror: false,
      message: "",
    },
  };

  const [errors, setErrors] = useState(initialErrorsState);

  let navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleInput = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:3007/user";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(userData),
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();
      // reset errors state
      setErrors(initialErrorsState);
      if (data.error) {
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
      } else if (data.status == 403) {
        // display email error - user with this email exists already
        setErrors((prevState) => {
          return {
            ...prevState,
            email: {
              haserror: true,
              message: data.message,
            },
          };
        });
      } else if (data.success) {
        // else check if data.success is true and redirect to login
        redirectToLogin();
      }
    } catch (err) {
      console.log("Caught error " + err);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Opret profil</h2>
        <form className={styles.form} autoComplete="off">
          <div className={styles.name_fields}>
            <FormField
              name="firstName"
              text="Fornavn"
              type="text"
              handleInput={handleInput}
              value={userData.firstName}
              hasError={errors.firstName.haserror}
              errorMessage={errors.firstName.message}
            />
            <FormField
              name="lastName"
              type="text"
              text="Efternavn"
              handleInput={handleInput}
              value={userData.lastName}
              hasError={errors.lastName.haserror}
              errorMessage={errors.lastName.message}
            />
          </div>
          <FormField
            name="email"
            type="email"
            text="E-mail"
            handleInput={handleInput}
            value={userData.email}
            hasError={errors.email.haserror}
            errorMessage={errors.email.message}
          />

          <FormField
            name="password"
            type="password"
            text="Adgangskode"
            handleInput={handleInput}
            value={userData.password}
            hasError={errors.password.haserror}
            errorMessage={errors.password.message}
          />

          <div className={styles.submit_field}>
            <button className={styles.submit_btn} onClick={handleSubmit}>
              Opret Profil
              {/* <Link to="/welcomeUser/:id">Opret profil</Link> */}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateUserProfile;
