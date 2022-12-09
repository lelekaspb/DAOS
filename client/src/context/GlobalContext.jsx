import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

export default function GlobalContext({ children }) {
  const initialUserInfoState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    picture: "",
    description: "",
    zipcode: "",
    city: "",
    instruments: [],
    orchestras_created: [],
    posts: [],
    searching: false,
    id: "",
    createdAt: "",
    token: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfoState);

  let navigate = useNavigate();
  const redirectoToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (!userInfo.token.length) {
      redirectoToLogin();
    }
  }, [userInfo.token]);

  const resetUserInfoState = () => {
    setUserInfo(initialUserInfoState);
  };

  return (
    <Context.Provider value={{ userInfo, setUserInfo, resetUserInfoState }}>
      {children}
    </Context.Provider>
  );
}

export const useGlobalContext = () => useContext(Context);
