import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post("api/auth/login", {
        username,
        password,
      });
      setTimeout(() => {
        // Save the token to local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.log("Error: " + error);
      setError(error.response.data.message);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="demo-container d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 mx-auto">
            <div className="p-5 bg-white rounded shadow-lg">
              <h2 className="mb-2 text-center">Sign In</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="font-500">
                    Username
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user fa-2x"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      className="form-control form-control-lg"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="font-500">
                    Password
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-lock fa-2x"></i>
                      </span>
                    </div>
                    <input
                      name="password"
                      className="form-control form-control-lg"
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <button className="btn btn-success mt-4 btn-lg w-100 shadow-lg">
                  {isLoggingIn ? "SIGNING IN..." : "SIGN IN"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
