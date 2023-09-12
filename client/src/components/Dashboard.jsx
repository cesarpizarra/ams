import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo-image.png";

const Dashboard = ({ children }) => {
  const handleLogout = () => {
    console.log("Logout button clicked");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");

        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      }
    });
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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Right Content */}
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
};

export default Dashboard;
