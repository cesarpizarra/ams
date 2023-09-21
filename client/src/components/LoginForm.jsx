import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import LoginImage from "../assets/LoginImage.png";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");

  const grades = [7, 8, 9, 10, 11, 12];
  const sections = [1, 2];

  const handleLogin = async () => {
    try {
      setError(null);

      // Check if grade and section are selected
      if (!grade || !section) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please select a grade and section",
          showConfirmButton: true,
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        }
      );

      const {
        token,
        role,
        grade: userGrades,
        section: userSections,
      } = response.data;

      console.log("Received userGrades:", userGrades);
      console.log("Received userSections:", userSections);
      console.log("Selected grade:", grade);
      console.log("Selected section:", section);

      // Check if the selected grade and section are included in the user's grades and sections
      const isGradeValid = userGrades.includes(Number(grade));
      const isSectionValid = userSections.includes(Number(section));

      if (isGradeValid && isSectionValid) {
        localStorage.setItem("token", token);
        localStorage.setItem("grade", JSON.stringify(Number(grade)));
        localStorage.setItem("section", JSON.stringify(Number(section)));

        onLogin(token, role);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "You don't have permission with this grade and section",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className=" w-full flex items-center justify-center gap-20 bg-gray-100 p-8">
      <div className="hidden md:flex justify-center items-center w-96">
        <img src={LoginImage} alt="image" className="w-full mt-36 floating " />
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-5">
          <img className="h-20 rounded-full" src={Logo} alt="Logo" />
          <p className="text-xl font-semibold">Leones National High School</p>
        </div>
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-600">
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
              className="input w-full input-style"
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
                className="input w-full input-style"
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
              className="w-full py-2 px-4 bg-green-400 text-white rounded-lg hover:bg-green-500 focus:outline-none "
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
