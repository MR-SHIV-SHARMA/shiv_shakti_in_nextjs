"use client";

import { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";

export default function ProtectedAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Check authentication status on page load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/adminAuth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAdminAuthenticated", "true"); // ✅ Save in localStorage
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Server Error! Try Again.");
    }
  };

  // ✅ Enter key se bhi login hoga
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return isAuthenticated ? (
    <AdminPanel />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Admin Login
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-3">{errorMessage}</p>
        )}

        {/* ✅ Input Field with Enter Key Support */}
        <input
          type="password"
          placeholder="Enter Admin Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // ✅ Enter key support
        />

        {/* ✅ Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
