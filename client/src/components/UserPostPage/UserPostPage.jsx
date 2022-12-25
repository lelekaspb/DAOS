import styles from "./UserPostPage.module.css";
import BackLink from "../BackLink/BackLink";
import RepresentativeSvg from "../RepresentativeSvg/RepresentativeSvg";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PinSvg from "../PinSvg/PinSvg";
import { useGlobalContext } from "../../context/GlobalContext";

const UserPostPage = () => {
  const { userInfo, setUserInfo } = useGlobalContext();

  const location = useLocation();
  const postId = location.state;

  const post = userInfo.posts.find((item) => item._id === postId);

  const deletePost = async (event) => {
    const url = `http://127.0.0.1:3007/post/${postId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      let response = await fetch(url, options);
      response = await response.json();
      if (response.success) {
        const indexOfPostToDelete = userInfo.posts.findIndex(
          (item) => item._id === postId
        );
        if (indexOfPostToDelete > -1) {
          const firstPart = userInfo.posts.slice(0, indexOfPostToDelete);
          const lastPart = userInfo.posts.slice(
            indexOfPostToDelete + 1,
            userInfo.posts.length
          );
          setUserInfo((prevState) => {
            return {
              ...prevState,
              posts: [...firstPart, ...lastPart],
            };
          });
          redirectToProfilePage();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  let navigate = useNavigate();
  const redirectToProfilePage = () => {
    navigate("/profile");
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile" />
        <h2 className={styles.page_heading}>{post.title}</h2>
        <span className={styles.created_at}>
          Opslag oprettet{" "}
          {new Date(post.createdAt).toLocaleString("da-DK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <div className={styles.rep}>
          <RepresentativeSvg />
          <span className={styles.rep_text}>
            {" "}
            {post.type === "looking" && post.orchestraName.length > 0
              ? post.orchestraName
              : `${userInfo.firstName} ${userInfo.lastName}`}
          </span>
        </div>
        <div className={styles.location}>
          <PinSvg />
          <span className={styles.location_text}>{post.location}</span>
        </div>

        <div className={styles.buttons}>
          <Link to="edit" state={postId}>
            <button className={styles.edit_btn}>Rediger opslag</button>
          </Link>
          <button className={styles.delete_btn} onClick={deletePost}>
            Slet opslag
          </button>
        </div>

        <div className={styles.instrument}>
          <span className={styles.label}>Instrument</span>
          <p className={styles.instrument_text}>
            {post.instrument}{" "}
            {post.type === "looking" ? "(Søges)" : "(Tilbytes)"}
          </p>
        </div>

        {post.description && post.description.length > 0 && (
          <div className={styles.description}>
            <span className={styles.label}>Beskrivelse</span>
            <p className={styles.description_text}>{post.description}</p>
          </div>
        )}

        {post.website && post.website.length > 0 && (
          <div className={styles.website}>
            <span className={styles.label}>Hjemmeside</span>
            <a href={post.website} target="_blank">
              {post.website}
            </a>
          </div>
        )}
      </section>
    </main>
  );
};

export default UserPostPage;
