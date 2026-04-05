import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ToggleThemeBtn from "./ToggleThemeBtn/ToggleThemeBtn";
import Logout from "./Logout";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [showSideNav, setShowSideNav] = useState(false);

  const sideNavOptions = [
    "Account",
    "Friends",
    "Play with frineds",
    "Modes",
    "How to Play ?",
    "More",
  ];

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-14 px-4 border-neutral-600 text-white bg-black">
      <button
        onClick={() => setShowSideNav(true)}
        className="flex items-center text-xl"
      >
        <GiHamburgerMenu />
      </button>
      {showSideNav && (
        <div
          className={`
    fixed top-0 left-0 h-full w-[260px] text-black bg-white dark:bg-zinc-900 dark:text-white shadow-xl flex flex-col z-[9999] transition-transform duration-300 ease-in-out
  `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-zinc-700 ">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              id="close"
              onClick={() => setShowSideNav(false)}
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Close menu"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col mt-2">
            {sideNavOptions.map((option, i) => (
              <NavLink
                to={`/${option.toLowerCase().trim()}`}
                key={i}
                className="
          text-left px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800
          transition focus:outline-none focus:bg-zinc-200 dark:focus:bg-zinc-700"
              >
                {option}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      <div className="flex items-center gap-6">
        <ToggleThemeBtn />
        <p className="text-2xl">
          <FaLightbulb color="yellow" />
        </p>
        <p className="text-2xl">
          <MdLeaderboard />
        </p>
        <p className="text-2xl">
          <FaGear />
        </p>
        <Logout />
      </div>
    </div>
  );
}

export default Navbar;
