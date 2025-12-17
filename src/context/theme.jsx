import { createContext, useContext, useState } from "react";

export const themeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const lightMode = () => {
    setThemeMode("light");
  };
  const darkMode = () => {
    setThemeMode("dark");
  };
  const value = { themeMode, setThemeMode, lightMode, darkMode };
  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(themeContext);
};
