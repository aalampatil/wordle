import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WordContextProvider } from "./context/Word.jsx";
import { ThemeContextProvider } from "./context/Theme.jsx";
import { AuthContextProvider } from "./context/Auth.jsx";
import { BrowserRouter } from "react-router-dom";



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <WordContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </WordContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);
