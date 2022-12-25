import styles from "./ContactModal.module.css";
import Modal from "react-modal";

const ContactModal = ({ showModal, closeModal, post }) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Contact information"
      ariaHideApp={false}
      className={styles.modal}
      style={{ overlay: { background: "rgb(0, 0, 0, 0.65)" } }}
    >
      {post.type === "looking" && post.orchestraName.length > 0 && (
        <div>
          <h3 className={styles.heading}>
            Kontakt <span>{post.orchestraName}</span>{" "}
          </h3>
          <div className={styles.contact_person}>
            Kontaktperson: <span>{post.creator.firstName}</span>{" "}
            <span>{post.creator.lastName}</span>
          </div>
        </div>
      )}

      {post.type === "play" && (
        <h3 className={styles.heading}>
          Kontakt <span>{post.creator.firstName}</span>{" "}
          <span>{post.creator.lastName}</span>
        </h3>
      )}

      <div className={styles.contact_buttons}>
        {post.creator.phoneNumber && (
          <a href={`tel:${post.creator.phoneNumber}`} className={styles.btn}>
            {post.creator.phoneNumber}
          </a>
        )}

        <a href={`mailto:${post.creator.email}`} className={styles.btn}>
          {post.creator.email}
        </a>
      </div>

      <div className={styles.dismiss_button}>
        <a className={styles.close_btn} onClick={closeModal}>
          Tilbage
        </a>
      </div>
    </Modal>
  );
};

export default ContactModal;
