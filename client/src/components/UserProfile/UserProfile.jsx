import EmptyUserProfileSection from "../EmptyUserProfileSection/EmptyUserProfileSection";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <article className={styles.main_info}>
          <div className={styles.user_info}>
            <div className={styles.user_details}>
              <div className={styles.user_details_left}>
                <img
                  src="./assets/portrait-placeholder.png"
                  className={styles.picture}
                  alt="profile picture"
                />
              </div>
              <div className={styles.user_details_right}>
                <h2 className={styles.page_heading}>Susanne Nielsen</h2>
                <span className={styles.created_at}>Oprettet Maj 2020</span>
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.user_details_btn}>
                Rediger profil
              </button>
              <button className={styles.user_details_btn}>Indstillinger</button>
            </div>
          </div>
          <div className={styles.membership}>
            <div className={styles.membership_board}>
              <h3 className={styles.membership_heading}>
                Er du medlem af et orkester?
              </h3>
              <p className={styles.membership_explanation}>
                Her kan du register som en medlem af et orkester
              </p>
              <button className={styles.is_member_btn}>Jeg er medlem</button>
              <button className={styles.register_in_orchestra_btn}>
                Bliv medlem
              </button>
            </div>
          </div>
        </article>
        <article className={styles.instruments_info}>
          <div className={styles.top_row}>
            <h2 className={styles.info_heading}>Mine instrumenter</h2>
            <button className={styles.info_btn}>Opret</button>
          </div>
          <EmptyUserProfileSection
            heading="Du har ingen instrumenter endnu"
            text="Opret en opslag så du kan finde, eller blive fundet af andre musikere"
            type="instrument"
          />
        </article>
        <article className={styles.orchestras_info}>
          <div className={styles.top_row}>
            <h2 className={styles.info_heading}>Mine ensembler</h2>
            <button className={styles.info_btn}>Opret</button>
          </div>
          <EmptyUserProfileSection
            heading="Du har ingen ensembler endnu"
            text="Opret en opslag så du kan finde, eller blive fundet af andre musikere"
            type="ensemble"
          />
        </article>
        <article className={styles.posts_info}>
          <div className={styles.top_row}>
            <h2 className={styles.info_heading}>Mine opslag</h2>
            <button className={styles.info_btn}>Opret</button>
          </div>
          <EmptyUserProfileSection
            heading="Du har ingen opslag endnu"
            text="Opret en opslag så du kan finde, eller blive fundet af andre
              musikere"
            type="opslag"
          />
        </article>
      </section>
    </main>
  );
};

export default UserProfile;
