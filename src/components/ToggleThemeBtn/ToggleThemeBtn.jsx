import React, { useEffect } from "react";
import { useThemeContext } from "../../context/theme";
import { button, p } from "motion/react-client";

function ToggleThemeBtn() {
  const { themeMode, lightMode, darkMode } = useThemeContext();
  const changeThemeMode = () => {
    if (themeMode === "light") darkMode();
    else lightMode();
  };
  


  return (
    <button
      className="w-fit h-8 m-1 p-2 rounded-lg flex items-center justify-center border-2 border-white bg-black text-white dark:bg-white dark:text-black"
      onClick={changeThemeMode}
      value={themeMode}
    >
      {themeMode === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ToggleThemeBtn;

{
  /* <label className="relative inline-flex items-center cursor-pointer">
      
      <input className="sr-only peer" type="checkbox" onChange={changeThemeMode} value="" checked={themeMode === "dark"} />
    
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
       <span className="ml-3 text-sm font-medium text-white">
        {themeMode === "light" ? "Light" : "Dark"}
      </span>
    </label> */
}
