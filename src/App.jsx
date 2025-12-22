import { useEffect } from "react";
import { useThemeContext } from "./context/Theme.jsx";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "./context/Auth.jsx";

function App() {
  const { themeMode } = useThemeContext();
  const {loading} = useAuthContext()

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  if (loading) return <p> loading page...</p>; //user is being fetched => false = user verified

  return (
    <div className="bg-white dark:bg-neutral-900 w-[100%] min-h-screen">
      <Outlet /> // i was rendering this as variable but outlet is a component
    </div>
  );
}

export default App;
