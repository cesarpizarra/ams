import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-image.png";
import LogoutModal from "../components/modals/LogoutModal";

const Dashboard = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Sidebar */}
      <nav className="w-64 bg-white border-r overflow-y-auto">
        <div className="flex items-center gap-4 p-4">
          <img src={logo} alt="logo" className="w-8" />
          <span className="text-2xl font-semibold text-gray-700">
            Dashboard
          </span>
        </div>
        <ul className="p-2">
          <li className="px-4 py-2 border-b">
            <Link to="/students">List of Students</Link>
          </li>
          <li className="px-4 py-2">
            <Link to="/add-student">Add Student</Link>
          </li>
          <li className="px-4 py-2">
            <button onClick={() => setIsLogoutModalOpen(true)}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Right Content */}
      <div className="flex-grow p-6">{children}</div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Dashboard;
