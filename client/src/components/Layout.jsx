import React from "react";
import logo from "../assets/icon.png";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import ChangePassword from "./ChangePassword";
import AddStudent from "./AddStudent";
import { Link, useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const role = localStorage.getItem("role");

  return (
    <div className="w-auto d-flex vh-100">
      <ChangePassword />
      <AddStudent />
      <CDBSidebar textColor="#fff" backgroundColor="#1d4ed8">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="" style={{ width: "30px" }} />
            <h6 className="mb-0">LNHS</h6>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large">
              <Link to="/dashboard">Dashboard</Link>
            </CDBSidebarMenuItem>
            <span>
              {role === "admin" ? (
                <CDBSidebarMenuItem icon="calendar">
                  <Link to="/attendance">Attendance</Link>
                </CDBSidebarMenuItem>
              ) : (
                ""
              )}
            </span>
            <span>
              {role === "admin" ? (
                <CDBSidebarMenuItem icon="user">
                  <Link to="/students">Students</Link>
                </CDBSidebarMenuItem>
              ) : (
                ""
              )}
            </span>
            <span>
              {role === "admin" ? (
                <CDBSidebarMenuItem icon="user">
                  <Link to="/teachers">Teachers</Link>
                </CDBSidebarMenuItem>
              ) : (
                ""
              )}
            </span>

            <span>
              {role === "teacher" ? (
                <CDBSidebarMenuItem icon="user">
                  <Link to="/student-list">Student List</Link>
                </CDBSidebarMenuItem>
              ) : (
                ""
              )}
            </span>
            <CDBSidebarMenuItem icon="plus">
              <span data-bs-toggle="modal" data-bs-target="#addStudentModal">
                Add Student
              </span>
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem icon="key">
              <span
                data-bs-toggle="modal"
                data-bs-target="#changePasswordModal"
              >
                Change Password
              </span>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              onClick={handleLogout}
              icon="gear"
              iconType="solid"
            >
              Log Out
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <div className="w-100 min-vh-100 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
