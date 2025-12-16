import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WordContextProvider } from "./context/Context.jsx";
import { ThemeContextProvider } from "./context/theme.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//     {
//         path:"/",
//         element: <App />,
//     }
// ]);

createRoot(document.getElementById("root")).render(
  // <RouterProvider router={router}>
  <ThemeContextProvider>
    <WordContextProvider>
      <App />
    </WordContextProvider>
  </ThemeContextProvider>
  //</RouterProvider>
);
