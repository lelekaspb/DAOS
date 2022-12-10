import { useState } from "react";
import FormField from "../FormField/FormField";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const Login = () => {
  const { userInfo, setUserInfo } = useGlobalContext();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    haserror: false,
    message: "",
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
      console.log(data);
      if (!data.success) {
        // display error message received from the server
        setError({ ...error, haserror: true, message: data.message });
      } else {
        setUserInfo({
          ...userInfo,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber || "",
          picture: data.user.picture || "",
          description: data.user.description || "",
          zipcode: data.user.zipcode || "",
          city: data.user.city || "",
          instruments: data.user.instruments,
          orchestras_created: data.user.orchestras_created,
          posts: data.user.posts,
          searching: data.user.searching || false,
          id: data.user._id,
          createdAt: data.user.createdAt,
          token: data.user.token,
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
          // autoComplete="off"
        >
          <div className={styles.row}>
            <FormField
              name="email"
              text="E-mail"
              type="email"
              handleInput={handleInput}
              value={userData.email}
              // isRequired={true}
            />
            <FormField
              name="password"
              text="Adgangskode"
              type="password"
              handleInput={handleInput}
              value={userData.password}
              // isRequired={true}
            />
          </div>
          {error.haserror && (
            <div className={styles.help_block}>{error.message}</div>
          )}

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
