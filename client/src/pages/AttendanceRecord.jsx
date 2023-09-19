import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceRecord = ({ studentId, token, grades, sections }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState(grades);
  const [section, setSection] = useState(sections);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentResponse = await axios.get(
          `http://localhost:3000/api/student/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (studentResponse.status === 200) {
          setStudentInfo(studentResponse.data.student);
        }

        const attendanceResponse = await axios.get(
          `http://localhost:3000/api/attendance/student/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (attendanceResponse.status === 200) {
          setAttendanceRecords(attendanceResponse.data.attendanceRecords);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, [studentId, token]);

  const handleViewAttendance = async () => {
    try {
      const attendanceResponse = await axios.get(
        `http://localhost:3000/api/attendance/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (attendanceResponse.status === 200) {
        setAttendanceRecords(attendanceResponse.data.attendanceRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading attendance records...</p>
      ) : (
        <>
          {studentInfo && (
            <>
              <h2>Student Information</h2>
              <p>First Name: {studentInfo.firstName}</p>
              <p>Middle Name: {studentInfo.middleName}</p>
              <p>Last Name: {studentInfo.lastName}</p>
            </>
          )}
          <h2>Attendance Records for {studentInfo.firstName}</h2>
          <button onClick={handleViewAttendance}>View Attendance</button>
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
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td>{record.date}</td>
                  <td>
                    {record.timeIn
                      ? new Date(record.timeIn).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    {record.timeOut
                      ? new Date(record.timeOut).toLocaleString()
                      : "-"}
                  </td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AttendanceRecord;
