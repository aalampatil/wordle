import { useEffect } from "react";
import { useThemeContext } from "./context/Theme.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/Auth.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  const { themeMode, loading } = useThemeContext();
  const { user } = useAuthContext();

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  if(loading) return <p> loading page...</p>

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default App;
