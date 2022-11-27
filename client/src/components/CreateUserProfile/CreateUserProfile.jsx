import FormField from "../FormField/FormField";
import styles from "./CreateUserProfile.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  const redirectToConfirmation = () => {
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
      console.log("created user:");
      console.log(data);
      redirectToConfirmation();
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
            />
            <FormField
              name="lastName"
              type="text"
              text="Efternavn"
              handleInput={handleInput}
              value={userData.lastName}
            />
          </div>
          <FormField
            name="email"
            type="email"
            text="E-mail"
            handleInput={handleInput}
            value={userData.email}
          />

          <FormField
            name="password"
            type="password"
            text="Adgangskode"
            handleInput={handleInput}
            value={userData.password}
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
