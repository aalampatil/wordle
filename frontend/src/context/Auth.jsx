import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../utils/axios.js";

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const backendUrl =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_SERVER
      : import.meta.env.VITE_BACKEND_URL;

  console.log("mode", import.meta.env.MODE);

  //this request will redirect to consent screen
  const googleAuth = async () => {
    try {
      window.open(`${authApi.defaults.baseURL}/user/google`, "_self");
      //_self allows to open the page in current tab
    } catch (error) {
      console.error(error.message);
    }
  };

  //this req will verified if user is authenticated or not
  const verified = async () => {
    try {
      const response = await authApi.get("/user/verified");
      if (response.data.success) {
        setUser(response.data.data);
        setAuthStatus(true);
      }
    } catch (error) {
      setUser(null);
      setAuthStatus(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await authApi.post("/user/logout");
      setUser(null);
      setAuthStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    loading,
    backendUrl,
    googleAuth,
    authStatus,
    logoutUser,
  };

  useEffect(() => {
    verified();
  }, []);
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export function UseAuthContext() {
  return useContext(authContext);
}
