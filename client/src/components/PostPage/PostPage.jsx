import styles from "./PostPage.module.css";
import BackLink from "../BackLink/BackLink";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import RepresentativeSvg from "../RepresentativeSvg/RepresentativeSvg";
import PinSvg from "../PinSvg/PinSvg";

const PostPage = () => {
  const location = useLocation();
  const postId = location.state;

  const initialPostState = {
    id: postId,
    title: "",
    type: "",
    location: "",
    description: "",
    instrument: "",
    orchestraName: "",
    website: "",
    createdAt: "",
    creator: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  };
  const [post, setPost] = useState(initialPostState);

  useEffect(() => {
    const fetchPost = async () => {
      const url = `http://127.0.0.1:3007/post/${postId}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      };

      try {
        const request = await fetch(url, options);
        const data = await request.json();

        if (data.success) {
          setPost((prevState) => {
            return {
              ...prevState,
              title: data.post.title,
              type: data.post.type,
              location: data.post.location,
              description: data.post.description,
              instrument: data.post.instrument,
              orchestraName: data.post.orchestraName,
              website: data.post.website,
              createdAt: data.post.createdAt,
              creator: {
                firstName: data.post.creator_id.firstName,
                lastName: data.post.creator_id.lastName,
                email: data.post.creator_id.email,
                phoneNumber: data.post.creator_id.phoneNumber,
              },
            };
          });
        } else {
          console.log("could not fetch the post");
          // handle error
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, []);

  const showPopup = (event) => {
    console.log(event.target);
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/posts" />
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
              : `${post.creator.firstName} ${post.creator.lastName}`}
          </span>
        </div>
        <div className={styles.location}>
          <PinSvg />
          <span className={styles.location_text}>{post.location}</span>
        </div>

        <div className={styles.buttons}>
          {/* <Link to="edit" state={postId}>
            <button className={styles.edit_btn}>Rediger opslag</button>
          </Link> */}
          <button className={styles.contact_btn} onClick={showPopup}>
            Kontakt
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

export default PostPage;
