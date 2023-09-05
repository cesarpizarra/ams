// StudentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = ({ token, grade, section }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/student/${grade}/${section}/students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setStudents(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch students error:", error);
      }
    };

    fetchStudents();
  }, [token, grade, section]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">List of Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.firstName} {student.middleName} {student.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
