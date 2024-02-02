import { useNavigate } from "react-router-dom";
import AddStudent from "./AddStudent";
import ChangePassword from "./ChangePassword";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  // Retrieve the username from local storage
  const username = localStorage.getItem("username");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <AddStudent />
      <ChangePassword />
      <div className="container-fluid">
        <a className="navbar-brand text-primary" href="/students">
          {username ? `Welcome, ${username}!` : "Welcome!"}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </a>
              <ul className="dropdown-menu">
                <li onClick={handleLogout}>
                  <a className="dropdown-item" href="#">
                    Log Out
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#changePasswordModal"
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <div data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addStudentModal"
            >
              Add New Student
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
