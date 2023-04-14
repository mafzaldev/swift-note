import { Toaster } from "react-hot-toast";
import AuthenticationScreen from "./views/AuthenticationScreen";
import NotesScreen from "./views/NotesScreen";
import userStore from "./stores/UserStore";

function App() {
  const { isAuthenticated } = userStore();
  return (
    <div className="App">
      {isAuthenticated ? <NotesScreen /> : <AuthenticationScreen />}
      {/* <NotesScreen /> */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
