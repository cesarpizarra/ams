// App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentList from "./components/StudentList";

const App = () => {
  const [token, setToken] = useState(null);
  const [grades, setGrades] = useState([]); // Add state for grades
  const [sections, setSections] = useState([]); // Add state for sections

  useEffect(() => {
    // Check if the token exists in local storage
    const storedToken = localStorage.getItem("token");
    const storedGrades = localStorage.getItem("grades"); // Get grades from local storage
    const storedSections = localStorage.getItem("sections"); // Get sections from local storage

    if (storedToken) {
      // Set the token in the state
      setToken(storedToken);
    }

    if (storedGrades) {
      // Set grades in the state
      setGrades(JSON.parse(storedGrades));
    }

    if (storedSections) {
      // Set sections in the state
      setSections(JSON.parse(storedSections));
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
          path="/students"
          element={
            token ? (
              <>
                <StudentList token={token} grade={7} section={1} />
                <StudentList token={token} grade={7} section={2} />
                {/* Additional routes for other grades and sections */}
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
