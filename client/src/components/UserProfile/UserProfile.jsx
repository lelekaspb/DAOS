import EmptyUserProfileSection from "../EmptyUserProfileSection/EmptyUserProfileSection";
import Instrument from "../Instrument/Instrument";
import styles from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import Orchestra from "../Orchestra/Orchestra";
import { useGlobalContext } from "../../context/GlobalContext";

const UserProfile = () => {
  const { userInfo } = useGlobalContext();

  const listOfInstruments = userInfo.instruments.map((instrument, index) => (
    <Instrument
      key={`${instrument.title}_${index}`}
      // deleteInstrument={deleteInstrument}
      title={instrument.title}
      genres={instrument.genres}
    />
  ));

  const listOfOrchestras = userInfo.orchestras_created.map(
    (orchestra, index) => (
      <Orchestra
        key={index}
        title={orchestra.title}
        linkTo="/edit-orchestra"
        orchestraId={orchestra.id}
      />
    )
  );

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <article className={styles.main_info}>
          <div className={styles.user_info}>
            <div className={styles.user_details}>
              <div className={styles.user_details_left}>
                <img
                  src="./../../assets/portrait-placeholder.png"
                  className={styles.picture}
                  alt="profile picture"
                />
              </div>
              <div className={styles.user_details_right}>
                <h2 className={styles.page_heading}>
                  {userInfo.firstName}&nbsp;{userInfo.lastName}
                </h2>
                <span className={styles.created_at}>
                  Oprettet{" "}
                  {new Date(userInfo.createdAt).toLocaleString("da-DK", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.user_details_btn}>
                <Link to="edit">Rediger profil</Link>
              </button>
              <button className={styles.user_details_btn}>
                <Link to="settings">Indstillinger</Link>
              </button>
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

        {/* instruments section */}
        <article className={styles.instruments_info}>
          <div className={styles.top_row}>
            <h2 className={styles.info_heading}>Mine instrumenter</h2>
            <button className={styles.info_btn}>
              <Link to="/add-instrument">Tilføj</Link>
            </button>
          </div>

          {userInfo.instruments.length == 0 && (
            <EmptyUserProfileSection
              heading="Du har ingen instrumenter endnu"
              text="Opret en opslag så du kan finde, eller blive fundet af andre musikere"
              cta="Tilføj instrument"
              linkTo="/add-instrument"
            />
          )}

          {userInfo.instruments.length > 0 && (
            <section className={styles.added_instruments}>
              {listOfInstruments}
            </section>
          )}
        </article>
        {/* instruments section end */}

        {/* orchestras section */}
        <article className={styles.orchestras_info}>
          <div className={styles.top_row}>
            <h2 className={styles.info_heading}>Mine ensembler</h2>
            <button className={styles.info_btn}>
              <Link to="/create-orchestra">Opret</Link>
            </button>
          </div>

          {userInfo.orchestras_created.length == 0 && (
            <EmptyUserProfileSection
              heading="Du har ingen ensembler endnu"
              text="Opret en opslag så du kan finde, eller blive fundet af andre musikere"
              cta="Opret ensemble"
              linkTo="/create-orchestra"
            />
          )}

          {userInfo.orchestras_created.length > 0 && (
            <section className={styles.added_orchestras}>
              {listOfOrchestras}
            </section>
          )}
        </article>
        {/* orchestras section end */}

        <article className={styles.posts_info}>
          <div className={styles.top_row}>
            <h2 className={styles.info_heading}>Mine opslag</h2>
            <button className={styles.info_btn}>Opret</button>
          </div>
          <EmptyUserProfileSection
            heading="Du har ingen opslag endnu"
            text="Opret en opslag så du kan finde, eller blive fundet af andre
              musikere"
            cta="Opret opslag"
          />
        </article>
      </section>
    </main>
  );
};

export default UserProfile;
