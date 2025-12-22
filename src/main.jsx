import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WordContextProvider } from "./context/Word.jsx";
import { ThemeContextProvider } from "./context/Theme.jsx";
import { AuthContextProvider } from "./context/Auth.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Protected from "./components/Protected.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <HomePage />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <WordContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </WordContextProvider>
  </ThemeContextProvider>
);
