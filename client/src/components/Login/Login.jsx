import { useState } from "react";
import FormField from "../FormField/FormField";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = ({ userInfo, setUserInfo }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  const redirectToProfile = () => {
    navigate("/profile");
  };

  const handleInput = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUserIn();
  };

  const signUserIn = async () => {
    const url = "http://127.0.0.1:3007/auth/login";
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
      if (data.statusCode) {
        console.log("did not login");
      } else {
        setUserInfo({
          ...userInfo,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
          picture: data.picture || "",
          description: data.description || "",
          zipcode: data.zipcode || "",
          city: data.city || "",
          instruments: data.instruments,
          orchestras_created: data.orchestras_created,
          searching: data.searching || false,
          id: data._id,
          createdAt: data.createdAt,
          token: data.token,
        });

        setUserData({
          ...userData,
          email: "",
          password: "",
        });

        redirectToProfile();
      }
    } catch (err) {
      console.log("Caught error " + err);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h2 className={styles.page_heading}>Log Ind</h2>
        <form
          className={styles.login_form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.row}>
            <FormField
              name="email"
              text="E-mail"
              type="email"
              handleInput={handleInput}
              value={userData.email}
              isRequired={true}
            />
            <FormField
              name="password"
              text="Adgangskode"
              type="password"
              handleInput={handleInput}
              value={userData.password}
              isRequired={true}
            />
          </div>
          <div className={styles.submit_field}>
            <button className={styles.submit_btn}>Log Ind</button>
          </div>
        </form>
        <a href="#" className={styles.forgotten_password}>
          Glemt adgangskode?
        </a>
      </section>
    </main>
  );
};

export default Login;
