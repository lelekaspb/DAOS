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
import CreatePost from "./components/CreatePost/CreatePost";
import { Routes, Route } from "react-router-dom";
import GlobalContext from "./context/GlobalContext";
import AllPosts from "./components/AllPosts/AllPosts";
import UserPostPage from "./components/UserPostPage/UserPostPage";

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
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/welcomeUser/:id" element={<WelcomeUser />} />
          <Route path="/profile">
            <Route index element={<UserProfile />} />
            <Route path="edit" element={<EditUserProfile />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="add-instrument" element={<AddInstrument />} />
            <Route path="create-orchestra" element={<CreateOrchestra />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="post" element={<UserPostPage />} />
          </Route>
          <Route path="/edit-orchestra" element={<EditOrchestra />} />
          <Route path="*" element={<FrontPage />} />
        </Routes>
        <Footer />
      </GlobalContext>
    </div>
  );
}

export default App;
