import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AttendanceDetails from "../components/AttendanceDetails";
import RequireAuth from "../utils/auth";
import NotFound from "../pages/NotFound";
import Dashboard from "../components/Dashboard";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Attendance from "../pages/Attendance";
import StudentList from "../pages/StudentList";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/attendance"
        element={
          <RequireAuth>
            <Attendance />
          </RequireAuth>
        }
      />
      <Route
        path="/students"
        element={
          <RequireAuth>
            <Students />
          </RequireAuth>
        }
      />
      <Route
        path="/student-list"
        element={
          <RequireAuth>
            <StudentList />
          </RequireAuth>
        }
      />
      <Route
        path="/teachers"
        element={
          <RequireAuth>
            <Teachers />
          </RequireAuth>
        }
      />
      <Route
        path="/attendance/:studentId"
        element={
          <RequireAuth>
            <AttendanceDetails />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
