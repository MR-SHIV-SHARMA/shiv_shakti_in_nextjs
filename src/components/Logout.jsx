"use client";

import { useState, useEffect } from "react";

export default function Logout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check authentication on page load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAdminAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");

    // ✅ Smooth transition before logout
    setTimeout(() => {
      setIsAuthenticated(false);
      window.location.reload();
    }, 500);
  };

  // ✅ If user is NOT authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Admin Login
          </h2>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login as Admin
          </button>
        </div>
      </div>
    );
  }

  // ✅ If user is authenticated, show dashboard & logout button
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 relative">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 text-center relative">
        {/* ✅ Logout Button - Always Visible & Properly Positioned */}
        <div className="w-full flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* ✅ Protected Content */}
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Welcome, Admin!</h1>
        <p className="mt-2 text-gray-600 text-lg">You are successfully logged in.</p>
      </div>
    </div>
  );
}
