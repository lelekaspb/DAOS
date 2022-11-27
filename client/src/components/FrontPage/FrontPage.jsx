import styles from "./FrontPage.module.css";
import FrontPageImage from "./FrontPageImage";
import FrontPageContent from "./FrontPageContent";

const FrontPage = () => {
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
            instrument4="Violin"
            instrument5="Flute"
          />
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <FrontPageImage photo="./src/assets/music.png" />
      </div>
    </main>
  );
};

export default FrontPage;
