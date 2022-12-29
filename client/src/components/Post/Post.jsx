import styles from "./Post.module.css";
import { Link } from "react-router-dom";

const Post = ({
  title,
  linkTo,
  postId,
  type,
  orchestraName,
  userName,
  location,
  createdAt,
  instrument,
}) => {
  return (
    <Link className={styles.post_link} to={linkTo}>
      <article className={styles.post}>
        <div className={styles.post_body}>
          <h5 className={styles.post_title}>{title}</h5>
          <div className={styles.representative}>
            <span>
              <svg
                width="10px"
                height="15px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="#9f9f9f"
              >
                <path d="M332.64,64.58C313.18,43.57,286,32,256,32c-30.16,0-57.43,11.5-76.8,32.38-19.58,21.11-29.12,49.8-26.88,80.78C156.76,206.28,203.27,256,256,256s99.16-49.71,103.67-110.82C361.94,114.48,352.34,85.85,332.64,64.58Z" />
                <path d="M432,480H80A31,31,0,0,1,55.8,468.87c-6.5-7.77-9.12-18.38-7.18-29.11C57.06,392.94,83.4,353.61,124.8,326c36.78-24.51,83.37-38,131.2-38s94.42,13.5,131.2,38c41.4,27.6,67.74,66.93,76.18,113.75,1.94,10.73-.68,21.34-7.18,29.11A31,31,0,0,1,432,480Z" />
              </svg>
            </span>
            {type === "looking" && orchestraName.length > 0
              ? orchestraName
              : userName}
          </div>
          <div className={styles.post_instrument}>
            <span>
              <svg
                x="0px"
                y="0px"
                viewBox="0 0 50.959 50.959"
                width="10px"
                height="15px"
              >
                <path
                  fill="#9f9f9f"
                  id="XMLID_52_"
                  d="M47.217,17.579c-0.093,0.488-0.746,0.629-1.004,0.204c-0.801-1.317-2.66-3.087-6.771-2.603
	c-1.784,0.21-7.722,0.636-10.813-1.21v24.906c0,0.033-0.008,0.064-0.01,0.097c-0.104,5.736-5.654,11.033-12.495,11.873
	C9.218,51.694,3.619,47.68,3.619,41.881s5.599-11.187,12.505-12.035c3.808-0.468,7.212,0.548,9.505,2.521V1.502
	c0-0.762,0.571-1.385,1.307-1.481l0-0.007c0,0,0.075-0.007,0.184-0.011c0.003,0,0.006-0.001,0.009-0.001
	c0.002,0,0.004,0.001,0.005,0.001c0.537-0.02,2.237,0.065,4.766,1.637c3.083,1.917,3.083,5.91,8.542,7.625
	C42.995,10.066,48.202,12.4,47.217,17.579z"
                />
              </svg>
            </span>
            {instrument}
          </div>
        </div>
        <div className={styles.post_footer}>
          <span className={styles.post_created}>
            {" "}
            {new Date(createdAt).toLocaleString("da-DK", {
              day: "numeric",
              month: "long",
            })}
          </span>
          <span> - </span>
          <span className={styles.post_location}>{location}</span>
        </div>
      </article>
    </Link>
  );
};

export default Post;
