import React, { useEffect, useState } from 'react';
import logo from '../assets/icon.png';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import ChangePassword from './ChangePassword';
import AddStudent from './AddStudent';
import { Link, useNavigate } from 'react-router-dom';
import { EncryptStorage } from 'encrypt-storage';
const SECRET = import.meta.env.VITE_LOCAL_KEY;
const encryptStorage = new EncryptStorage(SECRET, {
  storageType: 'localStorage',
});
const Layout = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Retrieve data from localStorage
    const data = encryptStorage.getItem('ascs');
    if (data) {
      setUserData(data);
    } else {
      console.log('No data found in storage');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ascs');
    navigate('/');
  };

  return (
    <div className="w-auto d-flex vh-100">
      <ChangePassword />
      <AddStudent />
      <CDBSidebar textColor="#fff" backgroundColor="#1d4ed8">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="" style={{ width: '30px' }} />
            <h6 className="mb-0">LNHS</h6>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <Link to="/dashboard">
              <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
            </Link>

            <span>
              {userData && userData.role === 'admin' ? (
                <Link to="/attendance">
                  <CDBSidebarMenuItem icon="calendar">
                    Attendance
                  </CDBSidebarMenuItem>
                </Link>
              ) : (
                ''
              )}
            </span>
            <span>
              {userData && userData.role === 'admin' ? (
                <Link to="/students">
                  <CDBSidebarMenuItem icon="user">Students</CDBSidebarMenuItem>
                </Link>
              ) : (
                ''
              )}
            </span>
            <span>
              {userData && userData.role === 'admin' ? (
                <Link to="/teachers">
                  <CDBSidebarMenuItem icon="user">Teachers</CDBSidebarMenuItem>
                </Link>
              ) : (
                ''
              )}
            </span>

            <span>
              {userData && userData.role === 'teacher' ? (
                <Link to="/student-list">
                  <CDBSidebarMenuItem icon="user">
                    Student List
                  </CDBSidebarMenuItem>
                </Link>
              ) : (
                ''
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
