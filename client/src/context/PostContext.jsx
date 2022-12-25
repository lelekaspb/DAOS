import { createContext, useState, useContext } from "react";

const PostContext = createContext();

export default function PostContextWrapper({ children }) {
  const initialPostState = {
    title: "",
    postId: "",
    type: "",
    orchestraName: "",
    creator: {
      firstName: "",
      lastName: "",
      searching: "",
      id: "",
    },
    location: "",
    createdAt: "",
    instrument: "",
    description: "",
    website: "",
  };

  const [post, setPost] = useState(initialPostState);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}

// export default PostContextWrapper;
export const usePostContext = () => useContext(PostContext);
