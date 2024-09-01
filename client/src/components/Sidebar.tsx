import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Logo from '../assets/icon.png';
import AddStudent from './AddStudent';
import ChangePassword from './ChangePassword';
import { EncryptStorage } from 'encrypt-storage';

const SECRET = import.meta.env.VITE_LOCAL_KEY;
const encryptStorage = new EncryptStorage(SECRET, {
  storageType: 'localStorage',
});

const Sidebar: React.FC = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve role from encrypted storage
    const storedRole = encryptStorage.getItem('ascs');
    setUserData(storedRole);
  }, []);

  const handleLogout = () => {
    encryptStorage.removeItem('token');
    encryptStorage.removeItem('ascs');
    navigate('/');
  };

  return (
    <>
      <AddStudent />
      <ChangePassword />
      <Navbar expand="lg" className="navbar navbar-dark bg-primary p-4">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={Logo}
              alt="LNHS Logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            LNHS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              {userData && userData?.role === 'admin' && (
                <>
                  <Link to="/attendance" className="nav-link">
                    Attendance
                  </Link>
                  <Link to="/students" className="nav-link">
                    Students
                  </Link>
                  <Link to="/teachers" className="nav-link">
                    Teachers
                  </Link>
                </>
              )}
              {userData && userData.role === 'teacher' && (
                <Link to="/student-list" className="nav-link">
                  Student List
                </Link>
              )}
              <NavDropdown title="Settings" id="navbarScrollingDropdown">
                <NavDropdown.Item
                  data-bs-toggle="modal"
                  data-bs-target="#addStudentModal"
                >
                  Add Student
                </NavDropdown.Item>
                <NavDropdown.Item
                  data-bs-toggle="modal"
                  data-bs-target="#changePasswordModal"
                >
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
