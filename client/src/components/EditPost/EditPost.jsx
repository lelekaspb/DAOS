import styles from "./EditPost.module.css";
import BackLink from "../BackLink/BackLink";
import PostForm from "../PostForm/PostForm";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const EditPost = () => {
  const { userInfo, setUserInfo } = useGlobalContext();
  const location = useLocation();
  const postId = location.state;

  const post = userInfo.posts.find((item) => item._id === postId);

  const { createdAt, ...formData } = post;
  formData.creator_id = userInfo.id;
  const [postData, setPostData] = useState(formData);

  const initialErrorsState = {
    title: {
      haserror: false,
      message: "",
    },
    type: {
      haserror: false,
      message: "",
    },
    instrument: {
      haserror: false,
      message: "",
    },
    description: {
      haserror: false,
      message: "",
    },
    location: {
      haserror: false,
      message: "",
    },
    orchestraName: {
      haserror: false,
      message: "",
    },
    website: {
      haserror: false,
      message: "",
    },
  };

  const [errors, setErrors] = useState(initialErrorsState);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: add client-side validation
    editPost();
  };

  const displayErrorMessages = (data) => {
    data.message.forEach((msg) => {
      const property = msg.property;
      const message = msg.constraints[Object.keys(msg.constraints)[0]];
      setErrors((prevState) => {
        return {
          ...prevState,
          [property]: {
            ...prevState[property],
            haserror: true,
            message: message,
          },
        };
      });
    });
  };

  const updateUserInfoState = (data) => {
    const index = userInfo.posts.findIndex((item) => item._id === postId);

    if (index > -1) {
      const firstPart = userInfo.posts.slice(0, index);
      const lastPart = userInfo.posts.slice(index + 1, userInfo.posts.length);

      setUserInfo((prevState) => {
        return {
          ...prevState,
          ["posts"]: [...firstPart, data.post, ...lastPart],
        };
      });
    }
  };

  const editPost = async () => {
    const url = `http://127.0.0.1:3007/post/${postId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(postData),
    };

    try {
      const request = await fetch(url, options);
      const data = await request.json();

      // reset errors atate in order to hide errors from previous query that might have been fixed in this one
      setErrors(initialErrorsState);

      // check response
      if (data.error) {
        // if 422 - update errors state
        displayErrorMessages(data);
      } else if (data.success) {
        // if successfully updated, update state and redirect to post page
        updateUserInfoState(data);
        redirectToPostPage();
      } else {
        // if sth unforseen happens, console log it
        console.log("sth went wrong");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let navigate = useNavigate();
  const redirectToPostPage = () => {
    navigate("/profile/post", { state: postId });
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile/post" state={postId} />
        <h2 className={styles.page_heading}>Rediger opslag</h2>
        <PostForm
          handleSubmit={handleSubmit}
          setPostData={setPostData}
          postData={postData}
          errors={errors}
          action="Rediger"
        />
      </section>
    </main>
  );
};

export default EditPost;
