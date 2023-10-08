import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ExcelJS from "exceljs";
import { AiFillFileExcel, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const StudentRecord = ({ token }) => {
  const { studentId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const navigate = useNavigate();

  // Define the fetchAttendanceRecords function
  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(
        `https://lnhs-api.vercel.app/api/attendance/student/${studentId}`,
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

  useEffect(() => {
    fetchAttendanceRecords();
  }, [studentId, token]);

  const goBackToStudentList = () => {
    navigate("/students");
  };

  const exportToExcel = () => {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance Records");

    // Add headers to the Excel worksheet
    worksheet.addRow(["Full Name", "Date", "Time In", "Time Out", "Status"]);

    // Add attendance records to the worksheet
    attendanceRecords.forEach((record) => {
      const { date, timeIn, timeOut, status } = record;
      worksheet.addRow([
        `${studentInfo.firstName} ${studentInfo.middleName} ${studentInfo.lastName}`,
        new Date(date).toLocaleDateString(),
        formatTime(timeIn),
        timeOut ? formatTime(timeOut) : "No Time Out",
        status,
      ]);
    });

    // Create a blob containing the Excel file
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      // Create a link to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${studentInfo.firstName} ${studentInfo.middleName} ${studentInfo.lastName}_Attendance.xlsx`; // Set the file name
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    });
  };

  // Function to format time
  const formatTime = (time) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(time).toLocaleTimeString("en-US", options);
  };

  const deleteAllAttendanceRecords = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Send a DELETE request to the backend to delete all attendance records
        const response = await axios.delete(
          `https://lnhs-api.vercel.app/api/attendance/delete-all/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Reload the attendance records after successful deletion
          fetchAttendanceRecords();
          Swal.fire("Deleted!", "All records have been deleted.", "success");
        }
      } catch (error) {
        console.error("Delete all attendance records error:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting records.",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={goBackToStudentList}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          <BiArrowBack />
        </button>
      </div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">
          Attendance Record for {studentInfo.firstName} {studentInfo.middleName}{" "}
          {studentInfo.lastName}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-2 py-1 rounded flex items-center gap-2"
          >
            <AiFillFileExcel />
            Export to Excel
          </button>
          <button
            onClick={deleteAllAttendanceRecords}
            className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-2"
          >
            <AiFillDelete />
            Delete All Records
          </button>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead className="bg-gray-500 text-white">
          <tr className="text-left">
            <th className="py-2 px-2">Date</th>
            <th className="py-2">Time In</th>
            <th className="py-2">Time Out</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length === 0 ? (
            <tr className="text-center">
              <td colSpan="4" className="pt-40 text-red-500">
                No Attendance Record of {studentInfo.firstName}{" "}
                {studentInfo.middleName} {studentInfo.lastName}
              </td>
            </tr>
          ) : (
            attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td className="py-2">
                  {new Date(record.date).toLocaleDateString("en-US", {
                    month: "long",
                  })}{" "}
                  {new Date(record.date).getDate()},{" "}
                  {new Date(record.date).getFullYear()}
                </td>
                <td className="py-2">
                  {new Date(record.timeIn).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
                <td className="py-2">
                  {!record.timeOut
                    ? "No Time Out"
                    : new Date(record.timeOut).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
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
