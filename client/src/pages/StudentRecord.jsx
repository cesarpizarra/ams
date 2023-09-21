import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const StudentRecord = ({ token }) => {
  const { studentId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        // Fetch attendance records for the specified student
        const response = await axios.get(
          `http://localhost:3000/api/attendance/student/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const { student, attendanceRecords } = response.data;
          setStudentInfo(student);
          setAttendanceRecords(attendanceRecords);
        }
      } catch (error) {
        console.error("Fetch attendance records error:", error);
      }
    };

    fetchAttendanceRecords();
  }, [studentId, token]);

  const goBackToStudentList = () => {
    navigate("/students");
  };
  return (
    <div>
      <div className="mb-4">
        <button
          onClick={goBackToStudentList}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Back to Student List
        </button>
      </div>
      <h2>
        Attendance Record for {studentInfo.firstName} {studentInfo.lastName}
      </h2>
      <table className="table-auto w-full">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2">Time In</th>
            <th className="py-2">Time Out</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length === 0 ? (
            <tr>
              <td colSpan="4">
                No Attendance Record for {studentInfo.firstName}{" "}
                {studentInfo.lastName}
              </td>
            </tr>
          ) : (
            attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td className="py-2">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="py-2">
                  {new Date(record.timeIn).toLocaleTimeString()}
                </td>
                <td className="py-2">
                  {new Date(record.timeOut).toLocaleTimeString()}
                </td>
                <td className="py-2">{record.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRecord;
