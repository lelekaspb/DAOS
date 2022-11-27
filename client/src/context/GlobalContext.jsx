import { createContext, useState, useContext } from "react";

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
    searching: false,
    id: "",
    createdAt: "",
    token: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfoState);

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
