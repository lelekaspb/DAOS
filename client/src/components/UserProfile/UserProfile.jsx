import EmptyUserProfileSection from "../EmptyUserProfileSection/EmptyUserProfileSection";
import Instrument from "../Instrument/Instrument";
import styles from "./UserProfile.module.css";
import { Link, Navigate } from "react-router-dom";
import Orchestra from "../Orchestra/Orchestra";
import Post from "../Post/Post";
import { useGlobalContext } from "../../context/GlobalContext";

const UserProfile = () => {
  const { userInfo, setUserInfo } = useGlobalContext();

  if (!userInfo.token.length) {
    return <Navigate to="/login" replace />;
  }

  const deleteGenre = (event) => {
    const instrumentTitle = event.target.dataset.instrument;
    const genreToDelete = event.target.dataset.value;
    const userInstrument = userInfo.instruments.find(
      (elem) => elem.title === instrumentTitle
    );
    const indexOfgenreToDelete = userInstrument.genres.findIndex(
      (elem) => elem === genreToDelete
    );
    const firstPart = userInstrument.genres.slice(0, indexOfgenreToDelete);
    const lastPart = userInstrument.genres.slice(
      indexOfgenreToDelete + 1,
      userInstrument.genres.length
    );
    userInstrument.genres = [...firstPart, ...lastPart];

    // change instrument id db via fetch request
    deleteGenreInDb(userInstrument);
  };

  const deleteGenreInDb = async (instrumentObject) => {
    const url = `http://127.0.0.1:3007/user/${userInfo.id}/instrument`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(instrumentObject),
    };

    try {
      let response = await fetch(url, options);
      response = await response.json();
      if (response.success) {
        const updatedInstruments = response.instruments;
        setUserInfo((prevState) => {
          return {
            ...prevState,
            instruments: updatedInstruments,
          };
        });
      } else {
        // TODO: handle error response
        console.error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const listOfInstruments = userInfo.instruments.map((instrument, index) => (
    <Instrument
      key={`${instrument.title}_${index}`}
      deleteGenre={deleteGenre}
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

  const listOfPosts = userInfo.posts.map((post, index) => (
    <Post
      title={post.title}
      key={`${index}`}
      instrument={post.instrument}
      location={post.location}
      type={post.type}
      orchestraName={post.orchestraName}
      userName={`${userInfo.firstName} ${userInfo.lastName}`}
      createdAt={post.createdAt}
      linkTo={`post/${post._id}`}
    />
  ));

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
              <Link to="add-instrument">Tilføj</Link>
            </button>
          </div>

          {userInfo.instruments.length == 0 && (
            <EmptyUserProfileSection
              heading="Du har ingen instrumenter endnu"
              text="Opret en opslag så du kan finde, eller blive fundet af andre musikere"
              cta="Tilføj instrument"
              linkTo="add-instrument"
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
              <Link to="create-orchestra">Opret</Link>
            </button>
          </div>

          {userInfo.orchestras_created.length == 0 && (
            <EmptyUserProfileSection
              heading="Du har ingen ensembler endnu"
              text="Opret en opslag så du kan finde, eller blive fundet af andre musikere"
              cta="Opret ensemble"
              linkTo="create-orchestra"
            />
          )}

          {userInfo.orchestras_created.length > 0 && (
            <section className={styles.added_orchestras}>
              {listOfOrchestras}
            </section>
          )}
        </article>
        {/* orchestras section end */}

        {/* posts section */}
        <article className={styles.posts_info}>
          <div className={styles.top_row}>
            <h2 className={styles.info_heading}>Mine opslag</h2>
            <button className={styles.info_btn}>
              <Link to="create-post">Opret</Link>
            </button>
          </div>

          {userInfo.posts.length == 0 && (
            <EmptyUserProfileSection
              heading="Du har ingen opslag endnu"
              text="Opret en opslag så du kan finde, eller blive fundet af andre
              musikere"
              cta="Opret opslag"
              linkTo="create-post"
            />
          )}

          {userInfo.posts.length > 0 && (
            <section className={styles.created_posts}>{listOfPosts}</section>
          )}
        </article>
        {/* posts section end */}
      </section>
    </main>
  );
};

export default UserProfile;
