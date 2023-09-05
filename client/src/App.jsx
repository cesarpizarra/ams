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
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedGrades = localStorage.getItem("grades");
    const storedSections = localStorage.getItem("sections");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedGrades) {
      setGrades(JSON.parse(storedGrades));
    }

    if (storedSections) {
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
              </>
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
