import styles from "./AllPosts.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Post from "../Post/Post";

const AllPosts = () => {
  const [filter, setFilter] = useState({
    posts: "all",
    instrument: "all",
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = `http://127.0.0.1:3007/post/find`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(filter),
      };

      try {
        const request = await fetch(url, options);
        const data = await request.json();
        if (data.success) {
          // set posts state
          setPosts([...data.posts]);
        } else {
          // handle error
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [filter]);

  const listOfPosts = posts.map((post, index) => (
    <Post
      key={index}
      title={post.title}
      postId={post._id}
      type={post.type}
      orchestraName={post.orchestraName}
      userName={`${post.creator_id.firstName} ${post.creator_id.lastName}`}
      location={post.location}
      createdAt={post.createdAt}
      instrument={post.instrument}
      linkTo="/posts/post"
    />
  ));

  const updateFilter = (event) => {
    switch (event.target.tagName) {
      case "BUTTON":
        setFilter((prevState) => {
          return {
            ...prevState,
            [event.target.dataset.filter]: event.target.dataset.value,
          };
        });
        break;
      case "SELECT":
        setFilter((prevState) => {
          return {
            ...prevState,
            [event.target.dataset.filter]: event.target.value,
          };
        });
        break;
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.filter}>
        <div className={styles.filter_content}>
          {" "}
          <h2 className={styles.page_heading}>Opslag</h2>
          <div className={styles.posts_count}>
            <span>{posts.length}</span> opslag fundet
          </div>
          <form className={styles.filter_form}>
            <div className={styles.post_instrument}>
              <label className={styles.label} htmlFor="instrument_select">
                Instrument
              </label>
              <select
                className={styles.select}
                id="instrument_select"
                data-filter="instrument"
                onChange={updateFilter}
              >
                <option value="all" defaultValue>
                  Alle
                </option>
                <option value="Piano">Piano</option>
                <option value="Flute">Flute</option>
                <option value="Drums">Drums</option>
                <option value="Guitar">Guitar</option>
              </select>
            </div>

            <div className={styles.post_types}>
              <label className={styles.label} htmlFor="buttons">
                Opslagstype
              </label>

              <div className={styles.buttons}>
                <button
                  type="button"
                  data-value="all"
                  data-filter="posts"
                  className={`${
                    filter.posts === "all"
                      ? styles.filter_button_active
                      : styles.filter_button_inactive
                  } `}
                  onClick={updateFilter}
                >
                  Alle
                </button>
                <button
                  type="button"
                  data-value="musicians"
                  data-filter="posts"
                  className={`${
                    filter.posts === "musicians"
                      ? styles.filter_button_active
                      : styles.filter_button_inactive
                  } `}
                  onClick={updateFilter}
                >
                  Find musikere
                </button>
                <button
                  type="button"
                  data-value="ensembles"
                  data-filter="posts"
                  className={`${
                    filter.posts === "ensembles"
                      ? styles.filter_button_active
                      : styles.filter_button_inactive
                  } `}
                  onClick={updateFilter}
                >
                  Find ensembler
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className={styles.posts}>
        <div className={styles.posts_content}>
          {posts.length > 0 && listOfPosts}
          {/* {listOfPosts} */}
          {posts.length === 0 && (
            <p className={styles.no_posts_msg}>
              Der er ingen opslag, der matcher din anmodning. Prøv at justere
              filteret.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default AllPosts;
