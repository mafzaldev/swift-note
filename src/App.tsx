import { Toaster } from "react-hot-toast";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import NotesScreen from "./screens/NotesScreen";
import userStore from "./stores/UserStore";

function App() {
  const { isAuthenticated } = userStore();
  return (
    <div className="App">
      {isAuthenticated ? <NotesScreen /> : <AuthenticationScreen />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
