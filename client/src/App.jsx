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

function App() {
  return (
    <div className="App">
      <Header />
      {/* <CreateUserProfile /> */}
      {/* <WelcomeUser /> */}
      {/* <UserSettings /> */}
      {/* <EditUserProfile /> */}
      {/* <Login /> */}
      {/* <FrontPage /> */}
      <UserProfile />
      {/* <AddInstrument /> */}
      {/* <CreateOrchestra /> */}
      <Footer />
    </div>
  );
}

export default App;
