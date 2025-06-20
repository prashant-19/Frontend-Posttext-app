// ✅ Header.jsx (standalone component for navigation)
import React from "react";
import { useAuth } from "../src/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
 <header className="bg-gray-800 text-white py-5 px-6 flex justify-between items-center shadow-md">
  <div className="flex gap-6 items-center">
    <Link to="/" className="hover:underline text-lg font-medium">Home</Link>
  </div>

  <div>
    {user ? (
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/saved-posts" className="hover:underline">Saved</Link>

        <button
          onClick={handleLogout}
          className="bg-rose-500 px-4 py-1 rounded-md hover:bg-rose-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="flex gap-3">
        <Link
          to="/login"
          className="bg-emerald-500 px-4 py-1 rounded-md hover:bg-emerald-600 transition cursor-pointer"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-600 transition cursor-pointer"
        >
          Register
        </Link>
      </div>
    )}
  </div>
</header>


    );
};

export default Header;
