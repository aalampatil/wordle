import { useEffect } from "react";
import { UseThemeContext } from "./context/Theme.jsx";
import { Outlet } from "react-router-dom";
import { UseAuthContext } from "./context/Auth.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const { themeMode } = UseThemeContext();
  const { loading } = UseAuthContext();

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <p> loading page...</p>
      </div>
    ); //user is being fetched => false = user verified

  return (
    <div className="bg-white dark:bg-neutral-900 w-[100%] min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
