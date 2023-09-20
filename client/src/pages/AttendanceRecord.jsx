import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AttendanceRecord = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const apiUrl =
      "http://localhost:3000/api/attendance/student/650785e17ea77fbfbdfd454e";

    axios
      .get(apiUrl)
      .then((response) => {
        const studentInfoFromApi = response.data.student;
        const attendanceRecordsFromApi = response.data.attendanceRecords;

        if (Array.isArray(attendanceRecordsFromApi)) {
          setStudentData({
            student: studentInfoFromApi,
            attendanceRecords: attendanceRecordsFromApi,
          });
        } else {
          console.error(
            "Attendance records from API is not an array:",
            attendanceRecordsFromApi
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Student Information</h2>
      {studentData && (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{studentData.student.firstName}</td>
              <td>{studentData.student.middleName}</td>
              <td>{studentData.student.lastName}</td>
            </tr>
          </tbody>
        </table>
      )}

      <h2>Attendance Records</h2>
      {studentData && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studentData.attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{new Date(record.timeIn).toLocaleTimeString()}</td>
                <td>{new Date(record.timeOut).toLocaleTimeString()}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {studentData && (
        <Link to="/student-records">
          <button className="bg-blue-400 text-white px-2 rounded">
            View Records
          </button>
        </Link>
      )}
    </div>
  );
};

export default AttendanceRecord;
