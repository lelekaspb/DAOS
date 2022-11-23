import { useEffect } from "react";
import { useState } from "react";
import BackLink from "../BackLink/BackLink";
import FormField from "../FormField/FormField";
import styles from "./EditUserProfile.module.css";
import { useNavigate } from "react-router-dom";

const EditUserProfile = ({ userInfo, setUserInfo }) => {
  const userCopy = JSON.parse(JSON.stringify(userInfo));
  const [userFormData, setUserFormData] = useState({
    firstName: userCopy.firstName,
    lastName: userCopy.lastName,
    email: userCopy.email,
    phoneNumber: userCopy.phoneNumber,
    picture: userCopy.picture,
    description: userCopy.description,
    zipcode: userCopy.zipcode,
    city: userCopy.city,
    searching: userCopy.searching,
  });

  const handleInput = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserFormData({
      ...userFormData,
      [property]: value,
    });
  };

  const handleSearchInput = (event) => {
    setUserFormData({
      ...userFormData,
      searching: event.target.dataset.value == "true",
    });
  };

  const searchBtnChosenStyle = {
    backgroundColor: "#c9cad4",
  };

  let navigate = useNavigate();
  const redirectToProfile = () => {
    navigate("/profile");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://127.0.0.1:3007/user/${userInfo.id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(userFormData),
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();
      // update state in App
      if (data.acknowledged) {
        setUserInfo({
          ...userInfo,
          firstName: userFormData.firstName,
          lastName: userFormData.lastName,
          email: userFormData.email,
          phoneNumber: userFormData.phoneNumber,
          picture: userFormData.picture,
          description: userFormData.description,
          zipcode: userFormData.zipcode,
          city: userFormData.city,
          searching: userFormData.searching,
        });
      }
      // redirect to profile page
      redirectToProfile();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile" />
        <h2 className={styles.page_heading}>Rediger profil</h2>
        <form
          className={styles.edit_profile_form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.name_fields}>
            <FormField
              name="firstName"
              text="Fornavn"
              type="text"
              value={userFormData.firstName}
              isRequired={true}
              handleInput={handleInput}
            />
            <FormField
              name="lastName"
              type="text"
              text="Efternavn"
              value={userFormData.lastName}
              isRequired={true}
              handleInput={handleInput}
            />
          </div>
          <div className={styles.picture_field}>
            <span className={styles.label}>Profilbillede</span>
            <img
              src="./../../assets/portrait-placeholder.png"
              className={styles.picture}
              alt="profile picture"
            />
            <button className={styles.upload_btn}>Upload billede</button>
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.description_field}>
            <label className={styles.label} htmlFor="description">
              Profilbeskrivelse
            </label>
            <textarea
              className={styles.description_input}
              placeholder="Skriv eventuelt kort om din musikalske erfaring eller hvad du søger..."
              name="description"
              onChange={handleInput}
              value={userFormData.description}
            />
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.location_field}>
            <FormField
              name="zipcode"
              text="Postnummer"
              type="text"
              value={userFormData.zipcode}
              handleInput={handleInput}
            />
            <FormField
              name="city"
              text="By"
              type="text"
              value={userFormData.city}
              handleInput={handleInput}
            />
          </div>
          <div className={styles.contact_field_wrapper}>
            {/* <label className={styles.explanation_heading}>
              Kontaktoplysninger
            </label> */}
            <p className={styles.explanation}>
              Din mail-adresse og mobilnummer er kun synligt for andre hvis du
              på din profil har markeret at du søger nogle at spille med eller
              hvis du har et aktivt opslag.
            </p>
            <div className={styles.contact_field}>
              <FormField
                name="email"
                type="email"
                text="E-mail"
                value={userFormData.email}
                handleInput={handleInput}
              />
              <FormField
                name="phoneNumber"
                type="text"
                text="Mobilnummer"
                value={userFormData.phoneNumber}
                handleInput={handleInput}
              />
            </div>
          </div>
          <div className={styles.searching_field}>
            <label className={styles.label}>Profilstatus</label>
            <p className={styles.explanation}>
              Søger du i øjeblikket nogle at spille med? Hvis du vælger "søger
              ikke" vil din profil ikke dukke op når andre musikere laver en
              søgning.
            </p>
            <div className={styles.search_switch}>
              <button
                type="button"
                className={styles.searching}
                data-value={true}
                onClick={handleSearchInput}
                style={userFormData.searching ? searchBtnChosenStyle : {}}
              >
                Søger
              </button>
              <button
                type="button"
                className={styles.not_searching}
                data-value={false}
                onClick={handleSearchInput}
                style={!userFormData.searching ? searchBtnChosenStyle : {}}
              >
                Søger ikke
              </button>
            </div>
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.submit_field}>
            <button className={styles.submit_btn}>Gem profil</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditUserProfile;
