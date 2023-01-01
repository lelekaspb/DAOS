import styles from "./FrontPage.module.css";
import FrontPageImage from "./FrontPageImage";
import FrontPageContent from "./FrontPageContent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const [instrument, setInstrument] = useState("all");

  const handleSelect = (event) => {
    setInstrument(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    redirectToPostsPage();
  };

  let navigate = useNavigate();
  const redirectToPostsPage = () => {
    navigate("/posts", { state: { posts: "all", instrument: instrument } });
  };

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.pageTitle}>
          <h1 className={styles.pageTitleText}>
            Stedet hvor amatørmusikere finder hinanden og spiller musik sammen
          </h1>
        </div>
        <div className={styles.navigation}>
          <FrontPageContent
            instrument1="Piano"
            instrument2="Guitar"
            instrument3="Drums"
            // instrument4="Violin"
            instrument5="Flute"
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <FrontPageImage photo="./src/assets/music_v2.png" />
      </div>
    </main>
  );
};

export default FrontPage;
