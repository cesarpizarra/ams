import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState(""); // Add grade state
  const [section, setSection] = useState(""); // Add section state

  const grades = [7, 8, 9, 10, 11, 12];
  const sections = [1, 2];

  const handleLogin = async () => {
    try {
      setError(null);

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        }
      );

      const { token, role, grade, section } = response.data; // Extract grade and section

      localStorage.setItem("token", token);
      localStorage.setItem("grades", JSON.stringify(grade)); // Store grade as a string
      localStorage.setItem("sections", JSON.stringify(section)); // Store section as a string
      onLogin(token, role);

      // Show a success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Login error:", error);

      // Show an error SweetAlert for failed login attempts
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <img
          className="mx-auto h-20 w-auto rounded-full"
          src={Logo}
          alt="Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder=" "
              className="input w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" className="user-label">
              Username
            </label>
          </div>
          <div className="input-group">
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder=" "
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="user-label">
                Password
              </label>
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BsEyeSlashFill className="h-5 w-5" />
                ) : (
                  <BsEyeFill className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="input-group">
            <select
              name="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="input w-full"
              required
            >
              <option value="">Select Grade</option>
              {grades.map((gradeOption) => (
                <option key={gradeOption} value={gradeOption}>
                  Grade {gradeOption}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <select
              name="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="input w-full"
              required
            >
              <option value="">Select Section</option>
              {sections.map((sectionOption) => (
                <option key={sectionOption} value={sectionOption}>
                  Section {sectionOption}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
