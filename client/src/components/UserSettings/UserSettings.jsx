import { useState } from "react";
import BackLink from "../BackLink/BackLink";
import FormField from "../FormField/FormField";
import styles from "./UserSettings.module.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const UserSettings = () => {
  const { userInfo, resetUserInfoState } = useGlobalContext();

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
  });

  const [error, setError] = useState({ haserror: false, message: "" });

  const handleInput = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };

  const submitPasswordChange = async (event) => {
    event.preventDefault();
    const url = `http://127.0.0.1:3007/user/${userInfo.id}/settings`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(passwordData),
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();
      if (!data.success) {
        setError((prevState) => {
          return {
            ...prevState,
            haserror: true,
            message: data.message,
          };
        });
      } else {
        redirectToProfilePage();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitDeletingProfile = async (event) => {
    event.preventDefault();
    const url = `http://127.0.0.1:3007/user/${userInfo.id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();
      console.log(data);
      if (data.acknowledged) {
        // redirect to front page and clear userInfo state
        resetUserInfoState();
        redirectToFrontPage();
      }
    } catch (err) {
      console.error(err);
    }
  };

  let navigate = useNavigate();
  const redirectToFrontPage = () => {
    navigate("/");
  };
  const redirectToProfilePage = () => {
    navigate("/profile");
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile" />
        <h2 className={styles.page_heading}>Indstillinger</h2>
        <form
          className={styles.change_password_form}
          onSubmit={submitPasswordChange}
        >
          <h3 className={styles.page_subheading}>Adgangskode</h3>
          <FormField
            name="current"
            text="Nuværende adgangskode"
            type="password"
            value={passwordData.current}
            isRequired={true}
            handleInput={handleInput}
            hasError={error.haserror}
            errorMessage={error.message}
          />

          <FormField
            name="new"
            text="Nyt adgangskode"
            type="password"
            value={passwordData.new}
            isRequired={true}
            handleInput={handleInput}
          />

          <div className={styles.change_password_submit_field}>
            <button className={styles.change_password_submit_btn}>
              Skift adgangskode
            </button>
          </div>
        </form>
        <form
          className={styles.delete_profile_form}
          onSubmit={submitDeletingProfile}
        >
          <h3 className={styles.page_subheading}>Profil</h3>
          <button className={styles.delete_profile_submit_btn}>
            Slet profil
          </button>
        </form>
      </section>
    </main>
  );
};

export default UserSettings;
