import React from "react";
import Navbar from "./Navbar";
import logo from "../assets/icon.png";
const Layout = ({ children }) => {
  return (
    <div className="w-auto">
      <div className="d-flex flex-column py-4 align-items-center justify-content-center bg-primary">
        <img
          src={logo}
          alt="logo"
          className="img-fluid img-responsive"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
        <h1 className="fw-bold fs-2 text-white">Leones National High School</h1>
      </div>
      <div className="px-2">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default Layout;
