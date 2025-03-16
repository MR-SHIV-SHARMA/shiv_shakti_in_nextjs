"use client";

import { useState, useEffect } from "react";

export default function Logout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAdminAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("isAdminAuthenticated");
      setIsAuthenticated(false);
      setIsLoggingOut(false);
      window.location.reload();
    }, 800);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl animate-fade-in-up">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Admin Portal
            </h2>
            <button
              onClick={handleLogin}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Secure Login
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">
              You'll be granted administrator privileges
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-4 flex justify-end">
      <button
        onClick={handleLogout}
        className={`flex items-center space-x-2 px-6 py-3 bg-red-500/90 hover:bg-red-600 text-white rounded-lg transition-all duration-300 ${
          isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoggingOut}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>{isLoggingOut ? "Logging Out..." : "Logout"}</span>
      </button>
    </div>
  );
}
