import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { BiLogOut, BiListOl, BiScan } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
const Dashboard = ({ children }) => {
  const handleLogout = () => {
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
    <div className="flex h-screen ">
      {/* Left Sidebar */}
      <nav className="w-64 bg-white border-r overflow-y-auto fixed h-full">
        <div className="flex items-center gap-4 p-4">
          <img src={logo} alt="logo" className="w-8" />
          <span className="text-2xl font-semibold text-gray-700">
            Dashboard
          </span>
        </div>
        <ul className="p-2 ">
          <li className="px-4 py-2 border-b-2 border-gray-300">
            <Link to="/students" className="flex items-center gap-2">
              <span>
                <BiListOl />
              </span>
              List of Students
            </Link>
          </li>
          <li className="px-4 py-2 border-b-2 border-gray-300">
            <Link to="/scan" className="flex items-center gap-2">
              <span>
                <BiScan />
              </span>
              Scan
            </Link>
          </li>
          <li className="px-4 py-2 border-b-2 border-gray-300">
            <Link to="/update-password" className="flex items-center gap-2">
              <span>
                <AiFillLock />
              </span>
              Change Password
            </Link>
          </li>
          <li className="px-4 py-2 border-b-2 border-gray-300 ">
            <button onClick={handleLogout} className="flex items-center gap-2">
              <span>
                <BiLogOut />
              </span>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Right Content */}
      <div className="flex-grow p-6 ml-64">{children}</div>
    </div>
  );
};

export default Dashboard;
