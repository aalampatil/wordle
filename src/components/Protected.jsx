import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth";

function Protected({ children, authentication }) {
  const { authStatus } = useAuthContext();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(false);
    if (authStatus !== authentication) {
      navigate(authentication ? "/login" : "/");
    }
  }, [authStatus, authentication, navigate]);
  return loader ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : (
    children
  );
}

export default Protected;
