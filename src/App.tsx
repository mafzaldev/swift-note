import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import useUserStore from "./stores/UserStore";

import Loader from "./components/Loader";
import AuthenticationScreen from "./screens/AuthenticationScreen";
const NotesScreen = lazy(() => import("./screens/NotesScreen"));

function App() {
  const { isAuthenticated } = useUserStore();
  return (
    <div className="App">
      {isAuthenticated ? (
        <Suspense fallback={<Loader />}>
          <NotesScreen />
        </Suspense>
      ) : (
        <AuthenticationScreen />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
