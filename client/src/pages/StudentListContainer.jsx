import React from "react";
import StudentList from "../pages/StudentList";

const StudentListContainer = ({ token }) => {
  const grades = JSON.parse(localStorage.getItem("grades") || "[]"); // Parse from string
  const sections = JSON.parse(localStorage.getItem("sections") || "[]"); // Parse from string
  console.log(grades);
  console.log(sections);
  return (
    <div>
      <StudentList token={token} grades={grades} sections={sections} />{" "}
    </div>
  );
};

export default StudentListContainer;
