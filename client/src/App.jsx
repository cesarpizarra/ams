// App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentListContainer from "./pages/StudentListContainer";
import Dashboard from "./components/Dashboard";
import ScanPage from "./pages/ScanPage";
import AttendanceRecord from "./pages/AttendanceRecord";

const App = () => {
  const [token, setToken] = useState(null);
  const [grade, setGrades] = useState([]);
  const [section, setSections] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedGrades = JSON.parse(localStorage.getItem("grade"));
    const storedSections = JSON.parse(localStorage.getItem("section"));

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedGrades) {
      setGrades(storedGrades);
    }

    if (storedSections) {
      setSections(storedSections);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/students" />
            ) : (
              <LoginForm
                onLogin={setToken}
                setGrades={setGrades}
                setSections={setSections}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard>
                <StudentListContainer
                  token={token}
                  grade={grade}
                  section={section}
                />
              </Dashboard>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/students"
          element={
            token ? (
              <Dashboard>
                <StudentListContainer
                  token={token}
                  grade={grade}
                  section={section}
                />
              </Dashboard>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/attendance"
          element={
            token ? (
              <Dashboard>
                <AttendanceRecord
                  studentId={selectedStudentId}
                  token={token}
                  grades={grade}
                  sections={section}
                />
              </Dashboard>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/scan"
          element={
            token ? (
              <Dashboard>
                <ScanPage />
              </Dashboard>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
