import React from "react";
import StudentList from "./StudentList";

const StudentListContainer = ({ token }) => {
  const grade = 7;
  const section = 1;

  return (
    <div>
      <StudentList token={token} grade={grade} section={section} />
    </div>
  );
};

export default StudentListContainer;
