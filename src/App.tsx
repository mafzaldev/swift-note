import Authentication from "./views/AuthenticationScreen";
import NotesScreen from "./views/NotesScreen";
import userStore from "./store/UserStore";
function App() {
  const { isAuthenticated } = userStore();
  return (
    <div className="App">
      {isAuthenticated ? <Authentication /> : <NotesScreen />}
    </div>
  );
}

export default App;
