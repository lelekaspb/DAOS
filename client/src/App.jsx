import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreateUserProfile from "./components/CreateUserProfile/CreateUserProfile";
import WelcomeUser from "./components/WelcomeUser/WelcomeUser";
import UserSettings from "./components/UserSettings/UserSettings";
import EditUserProfile from "./components/EditUserProfile/EditUserProfile";
import Login from "./components/Login/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import FrontPage from "./components/FrontPage/FrontPage";
import AddInstrument from "./components/AddInstrument/AddInstrument";
import CreateOrchestra from "./components/CreateOrchestra/CreateOrchestra";
import EditOrchestra from "./components/EditOrchestra/EditOrchestra";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
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
    orchestras: [],
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
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/login"
          element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}
        />
        <Route path="/create-profile" element={<CreateUserProfile />} />
        <Route
          path="/welcomeUser/:id"
          element={<WelcomeUser firstName={userInfo.firstName} />}
        />
        <Route
          path="/settings"
          element={
            <UserSettings
              userInfo={userInfo}
              resetUserInfoState={resetUserInfoState}
            />
          }
        />
        <Route
          path="/edit-profile"
          element={
            <EditUserProfile userInfo={userInfo} setUserInfo={setUserInfo} />
          }
        />
        <Route path="/profile" element={<UserProfile userInfo={userInfo} />} />
        <Route
          path="/add-instrument"
          element={
            <AddInstrument userInfo={userInfo} setUserInfo={setUserInfo} />
          }
        />
        <Route path="/create-orchestra" element={<CreateOrchestra />} />
        <Route path="/edit-orchestra" element={<EditOrchestra />} />
        <Route path="*" element={<FrontPage />} />
      </Routes>
      <Footer />

      {/* <Header />
        <CreateUserProfile />
        <WelcomeUser />
        <UserSettings />
        <EditUserProfile />
        <Login />
        <FrontPage />
        <UserProfile />
        <AddInstrument />
        <CreateOrchestra />
        <EditOrchestra />
        <Footer /> */}
    </div>
  );
}

export default App;
