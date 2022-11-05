import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreateUserProfile from "./components/CreateUserProfile/CreateUserProfile";
import WelcomeUser from "./components/WelcomeUser/WelcomeUser";
import UserSettings from "./components/UserSettings/UserSettings";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <CreateUserProfile /> */}
      {/* <WelcomeUser /> */}
      <UserSettings />
      <Footer />
    </div>
  );
}

export default App;
