import "./App.css";
import Board from "./components/board/Board.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Result from "./components/Result.jsx";
import { useContext, useEffect } from "react";
import { WordContext } from "./context/Context.jsx";
import { useThemeContext } from "./context/theme.jsx";
import { html } from "motion/react-client";

function App() {
  const {gameOver} = useContext(WordContext);
  const {themeMode, darkMode, lightMode} = useThemeContext()

  useEffect(()=>{
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  },[themeMode])

  return (
    <div className="bg-white dark:bg-neutral-900 w-[100%] min-h-screen">
      <Navbar />
      <div className="flex flex-col gap-0 relative">
      <Board />
      {gameOver && <Result show={gameOver} />}
      </div>
      <Footer />
    </div>
  );
}


export default App;
