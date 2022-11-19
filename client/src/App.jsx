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
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateUser" element={<CreateUserProfile />} />
        <Route path="/welcomeUser/:id" element={<WelcomeUser />} />
        <Route path="/Settings/:id" element={<UserSettings />} />
        <Route path="/EditProfile/:id" element={<EditUserProfile />} />
        <Route path="/UserProfile/:id" element={<UserProfile />} />
        <Route path="/addInstrument/:id" element={<AddInstrument />} />
        <Route path="/CreateOrchestra/new" element={<CreateOrchestra />} />
        <Route path="/EditOrchestra/:id" element={<EditOrchestra />} />
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
