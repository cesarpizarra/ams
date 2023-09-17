// import React, { useState } from "react";
// import axios from "axios";
// import Logo from "../assets/logo.png";
// import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
// import Swal from "sweetalert2";

// const LoginForm = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedGrade, setSelectedGrade] = useState(""); // Initialize with an empty string
//   const [selectedSection, setSelectedSection] = useState(""); // Initialize with an empty string

//   const handleLogin = async () => {
//     try {
//       setError(null);

//       const response = await axios.post(
//         "http://localhost:3000/api/auth/login",
//         {
//           username,
//           password,
//         }
//       );

//       const { token, role, grades, sections } = response.data;

//       console.log("Grades:", grades);
//       console.log("Sections:", sections);

//       localStorage.setItem("token", token);
//       localStorage.setItem("grades", grades);
//       localStorage.setItem("sections", sections);
//       onLogin(token, role);

//       // Show a success SweetAlert
//       Swal.fire({
//         icon: "success",
//         title: "Login Successful",
//         text: "Welcome back!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } catch (error) {
//       console.error("Login error:", error);

//       // Show an error SweetAlert for failed login attempts
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: "Invalid username or password",
//         showConfirmButton: true,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//         <img
//           className="mx-auto h-20 w-auto rounded-full"
//           src={Logo}
//           alt="Logo"
//         />
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
//           Sign in to your account
//         </h2>
//         <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
//           // Dropdown for selecting grade
//           <select
//             name="grade"
//             value={selectedGrade}
//             onChange={(e) => setSelectedGrade(e.target.value)}
//             className="border rounded px-2 py-1 mb-2 input-style"
//           >
//             <option value="">Select Grade</option>
//             {grades.map((grade) => (
//               <option key={grade} value={grade}>
//                 Grade {grade}
//               </option>
//             ))}
//           </select>
//           // Dropdown for selecting section
//           <select
//             name="section"
//             value={selectedSection}
//             onChange={(e) => setSelectedSection(e.target.value)}
//             className="border rounded px-2 py-1 mb-2 input-style"
//           >
//             <option value="">Select Section</option>
//             {sections.map((section) => (
//               <option key={section} value={section}>
//                 Section {section}
//               </option>
//             ))}
//           </select>
//           <div className="input-group">
//             <input
//               id="username"
//               name="username"
//               type="text"
//               autoComplete="username"
//               required
//               placeholder=" "
//               className="input w-full"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <label htmlFor="username" className="user-label">
//               Username
//             </label>
//           </div>
//           <div className="input-group">
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="current-password"
//                 required
//                 placeholder=" "
//                 className="input w-full"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <label htmlFor="password" className="user-label">
//                 Password
//               </label>
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 focus:outline-none"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <BsEyeSlashFill className="h-5 w-5" />
//                 ) : (
//                   <BsEyeFill className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>
//           <div>
//             <button
//               type="button"
//               onClick={handleLogin}
//               className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
//             >
//               Sign In
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [grades, setGrades] = useState([]); // Initialize with an empty array
  const [sections, setSections] = useState([]); // Initialize with an empty array
  const [selectedGrade, setSelectedGrade] = useState(""); // Initialize with an empty string
  const [selectedSection, setSelectedSection] = useState(""); // Initialize with an empty string
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the available grades and sections when the component mounts
    async function fetchGradeAndSectionOptions() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/grades-and-sections"
        );

        if (response.status === 200) {
          const { grades, sections } = response.data;
          setGrades(grades);
          setSections(sections);
        }
      } catch (error) {
        console.error("Fetch grade and section options error:", error);
      }
    }

    fetchGradeAndSectionOptions();
  }, []);

  const handleLogin = async () => {
    try {
      setError(null);

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
          grade: selectedGrade, // Include selectedGrade in the login request
          section: selectedSection, // Include selectedSection in the login request
        }
      );

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      onLogin(token, role);

      // Rest of your login code...
    } catch (error) {
      console.error("Login error:", error);
      // Rest of your error handling...
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

          {/* Grade Dropdown */}
          <div className="input-group">
            <label htmlFor="grade" className="user-label">
              Grade
            </label>
            <select
              id="grade"
              name="grade"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="input w-full"
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Section Dropdown */}
          <div className="input-group">
            <label htmlFor="section" className="user-label">
              Section
            </label>
            <select
              id="section"
              name="section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="input w-full"
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  Section {section}
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
