import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AttendanceDetails from "../components/AttendanceDetails";
import Layout from "../components/Layout";
import StudentList from "../components/StudentList";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/attendance/:studentId" element={<AttendanceDetails />} />
    </Routes>
  );
};

export default AppRoutes;
