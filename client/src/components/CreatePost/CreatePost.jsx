import BackLink from "../BackLink/BackLink";
import PostForm from "../PostForm/PostForm";
import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const CreatePost = () => {
  const { userInfo, setUserInfo } = useGlobalContext();

  if (!userInfo.token.length) {
    return <Navigate to="/login" replace />;
  }

  const [postData, setPostData] = useState({
    title: "",
    type: "looking",
    instrument: "",
    description: "",
    location: "",
    orchestraName: "",
    website: "",
    creator_id: userInfo.id,
  });

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

  let navigate = useNavigate();
  const redirectToProfile = () => {
    navigate("/profile");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: add client-side validation
    createPost();
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

  const createPost = async () => {
    const url = `http://127.0.0.1:3007/post`;
    const options = {
      method: "POST",
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
        // if post created, update userInfo state
        setUserInfo((prevState) => {
          return {
            ...prevState,
            ["posts"]: [...prevState.posts, data.post],
          };
        });

        // and redirect to profile page
        redirectToProfile();
      } else {
        // if sth unforseen happens, console log it
        console.log("sth went wrong");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <BackLink component="/profile" />
        <h2 className={styles.page_heading}>Opret opslag</h2>
        <PostForm
          handleSubmit={handleSubmit}
          setPostData={setPostData}
          postData={postData}
          errors={errors}
          action="Opret"
        />
      </section>
    </main>
  );
};

export default CreatePost;
