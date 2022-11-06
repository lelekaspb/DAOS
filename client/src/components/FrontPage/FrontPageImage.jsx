import styles from "./FrontPage.module.css";

const FrontPageImage = ({photo}) =>{
    return(
        <div className={styles.photo}>
            <img src={photo} alt={name} />
        </div>

    );
}

export default FrontPageImage; 