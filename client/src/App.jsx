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
import UserOrchestras from "./components/UserOrchestras/UserOrchestras";
import { Routes, Route } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";

function App() {
  return (
    <div className="App">
      <GlobalContext>
        <Header />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/orchestras" element={<UserOrchestras />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-profile" element={<CreateUserProfile />} />
          <Route path="/welcomeUser/:id" element={<WelcomeUser />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/edit-profile" element={<EditUserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-instrument" element={<AddInstrument />} />
          <Route path="/create-orchestra" element={<CreateOrchestra />} />
          <Route path="/edit-orchestra" element={<EditOrchestra />} />
          <Route path="*" element={<FrontPage />} />
        </Routes>
        <Footer />
      </GlobalContext>
    </div>
  );
}

export default App;
