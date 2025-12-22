import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false)
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  //this request will redirect to consent screen
  const googleAuth = async () => {
    try {
      window.open(`${backendUrl}/user/google`, "_self");
      //_self allows to open the page in current tab
    } catch (error) {
      console.error(error.message);
    }
  };
  

  //this req will verified if user is authenticated or not
  const verified = async () => {
  try {
      const response = await axios.get(`${backendUrl}/user/verified`, {withCredentials: true})
      //console.log(response.data);      
      if(response.data.success) {
        setUser(response.data.data)
        setAuthStatus(true)
      }       
    } catch (error) {
      console.log(error.message);
      setUser(null) 
    } finally {
       setLoading(false)
    }
  }

  const value = { user, loading, backendUrl, googleAuth, authStatus };

  useEffect(() => {
    verified();
  }, []);
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export function useAuthContext() {
  return useContext(authContext);
}
