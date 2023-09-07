import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentListContainer from "./components/StudentListContainer";
import StudentDetails from "./components/StudentDetails"; // Import the StudentDetails component

const App = () => {
  const [token, setToken] = useState(null);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedGrades = JSON.parse(localStorage.getItem("grades")) || [];
    const storedSections = JSON.parse(localStorage.getItem("sections")) || [];

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
          path="/students"
          element={
            token ? (
              <StudentListContainer
                token={token}
                grades={grades}
                sections={sections}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Add a new route for StudentDetails */}
        <Route path="/student/:studentId" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
