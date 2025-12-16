// import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa6";
import { MdLeaderboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { useThemeContext } from "../context/theme";
import ToggleThemeBtn from "./ToggleThemeBtn/ToggleThemeBtn";

function Navbar() {
  
  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between w-full h-14 px-4 border-b border-neutral-600 text-white bg-black">
      <button className="flex items-center text-xl">
        <GiHamburgerMenu />
      </button>

      <div className="flex items-center gap-6">
        <ToggleThemeBtn />
        <p className="text-2xl"><FaLightbulb /></p>
        <p className="text-2xl"><MdLeaderboard /></p>
        <p className="text-2xl"><FaGear /></p>
      </div>
    </div>
  );
}

export default Navbar;
