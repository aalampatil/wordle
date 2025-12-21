import React from "react";
import { useAuthContext } from "../context/Auth";

const GoogleLogin = () => {
  const { googleAuth } = useAuthContext();

  function handleClick() {
    googleAuth();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
    
    {/* Logo / Title */}
    <h1 className="text-2xl font-bold text-gray-800 mb-2">
      Welcome Back 👋
    </h1>
    <p className="text-gray-600 mb-6">
      Verify yourself to continue playing
    </p>

    {/* Divider */}
    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="px-3 text-sm text-gray-400">Sign in</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>

    {/* Google Button */}
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Continue with Google
    </button>

    {/* Footer text */}
    <p className="text-xs text-gray-400 mt-6">
      By continuing, you agree to our Terms & Privacy Policy
    </p>
  </div>
</div>

  );
};

export default GoogleLogin;
