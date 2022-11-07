import styles from "./FrontPage.module.css";

const FrontPage = () => {
    return (
        <main className={styles.mainWrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.pageTitle}>
                    <h1>Stedet hvor amatørmusikere finder hinanden og spiller musik sammen</h1>
                </div>
                <div className={styles.navigation}>
                    <div className={styles.musicInstruments}>
                        <form action="#">
                            <select id="instruments" name="instruments">
                                <option value="Piano">Piano</option>
                                <option value="Flute">Flute</option>
                                <option value="Drums">Drums</option>
                                <option value="Guitar">Guitar</option>
                            </select>
                            <a href="#" className={styles.seOpslag_btn}>
                                Se Opslag
                            </a>
                        </form>
                    </div>
                </div>
            </div>

            <div className={styles.imageWrapper}>
                <img src="./src/assets/image-placeholder.png" alt="music picture"></img>
            </div>
        </main>
    );
}

export default FrontPage;