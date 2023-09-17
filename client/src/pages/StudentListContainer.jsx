import React from "react";
import StudentList from "../pages/StudentList";

const StudentListContainer = ({ token }) => {
  const grades = Number(JSON.parse(localStorage.getItem("grades")) || 0);
  const sections = Number(JSON.parse(localStorage.getItem("sections")) || 0);

  console.log(grades);
  console.log(sections);
  return (
    <div>
      <StudentList token={token} grades={grades} sections={sections} />{" "}
    </div>
  );
};

export default StudentListContainer;
