import BackLink from "../BackLink/BackLink";
import FormField from "../FormField/FormField";
import styles from "./EditUserProfile.module.css";

const EditUserProfile = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink />
        <h2 className={styles.page_heading}>Rediger profil</h2>
        <form className={styles.edit_profile_form}>
          <div className={styles.name_fields}>
            <FormField name="first_name" text="Fornavn" type="text" />
            <FormField name="last_name" type="text" text="Efternavn" />
          </div>
          <div className={styles.picture_field}>
            <span className={styles.label}>Profilbillede</span>
            <img
              src="./assets/portrait-placeholder.png"
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
              placeholder="Skriv eventuelt kort om din musikalske erfaring eller hvad du
              søger..."
            ></textarea>
            <span className={styles.help_block}></span>
          </div>
          <div className={styles.location_field}>
            <FormField name="zip_code" text="Postnummer" type="text" />
            <FormField name="city" text="By" type="text" />
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
              <FormField name="email" type="email" text="E-mail" />
              <FormField name="mobile" type="text" text="Mobilnummer" />
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
              <button className={styles.searching}>Søger</button>
              <button className={styles.not_searching}>Søger ikke</button>
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
