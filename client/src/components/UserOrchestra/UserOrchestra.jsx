import OrchestraGenre from "../OrchestraGenre/OrchestraGenre";
import styles from "./UserOrchestra.module.css";

const UserOrchestra = ({
  title,
  zipcode,
  city,
  website,
  isMember,
  members,
  orchestraId,
  userId,
  addMember = null,
  deleteMember = null,
}) => {
  return (
    <article className={styles.orchestra}>
      <img
        className={styles.orchestra_picture}
        src="./../../assets/placeholder-rectangle.png"
        alt="cover picture"
      />
      <div className={styles.orchestra_title}>
        <h4 className={styles.orchestra_title_heading}>{title}</h4>
      </div>
      <div className={styles.orchestra_details}>
        <span className={styles.orchestra_address}>
          {zipcode}&nbsp;{city}
        </span>
        <span className={styles.orchestra_website}>{website}</span>
      </div>
      {members.length > 0 && (
        <div className={styles.members}>
          <h4 className={styles.label}>Medlemmer</h4>
          <div className={styles.members_list}>{members}</div>
        </div>
      )}

      {members.length == 0 && (
        <div className={styles.members}>
          <h4 className={styles.label}>Ingen medlemmer</h4>
        </div>
      )}

      {/* {description && (
        <div className={styles.orchestra_description}>
          <h4 className={styles.label}>Beskrivelse</h4>
          <span className={styles.text}>{description}</span>
        </div>
      )} */}
      {/* {musitiansAmount && (
        <div className={styles.orchestra_amount}>
          <h4 className={styles.label}>Antal aktive musikere</h4>
          <span className={styles.text}>{musitiansAmount}</span>
        </div>
      )}
      {frequency && (
        <div className={styles.orchestra_frequency}>
          <h4 className={styles.label}>Øvefrekvens</h4>
          <span className={styles.text}>{frequency}</span>
        </div>
      )} */}
      {/* {genres && (
        <div className={styles.orchestra_genres}>
          <h4 className={styles.label}>Genrer</h4>
          <div className={styles.genres_container}>
            {genres.map((genre, index) => (
              <OrchestraGenre key={index} title={genre} />
            ))}
          </div>
        </div>
      )} */}
      <div className={styles.membership}>
        {isMember && (
          <button
            className={styles.leave_orchestra}
            onClick={deleteMember}
            data-orchestra={orchestraId}
            data-user={userId}
          >
            Forlade ensemblet
          </button>
        )}
        {!isMember && (
          <button
            className={styles.become_member}
            onClick={addMember}
            data-orchestra={orchestraId}
            data-user={userId}
          >
            Bliv medlem
          </button>
        )}
      </div>
    </article>
  );
};

export default UserOrchestra;
