import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {
  deleteAttendance,
  getStudentAttendance,
  getStudentData,
} from "../services/student";
import { formatDate, formatTime } from "../utils";
const AttendanceDetails = () => {
  const { studentId } = useParams();
  const [data, setData] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getStudentData(studentId);
        setData(response);
      } catch (error) {
        console.log("Error", error);
      }
    };

    getData();
  }, []);

  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentAttendance(studentId);
      setTimeout(() => {
        setIsLoading(false);
        setAttendance(response);
      }, 1500);
    } catch (error) {
      console.log("Error fetch attendance", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const isTimeIn = !!attendance.timeIn;

  const handleDeleteAttendance = async () => {
    try {
      // Use SweetAlert for confirmation
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteAttendance(studentId);

        fetchAttendance();
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const exportToExcel = () => {
    const dataForExport = attendance.map((record) => ({
      Date: formatDate(record.date),
      "Time In": formatTime(record.timeIn, isTimeIn),
      "Time Out": formatTime(record.timeOut, !isTimeIn),
      Status: record.status,
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the file with the student's name
    const fileName = `${data.firstName}_${data.middleName}_${data.lastName}_Attendance.xlsx`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };
  return (
    <Layout>
      <div className="container-fluid mt-5">
        <div className="d-md-flex align-items-center justify-content-between mt-3">
          <h2>
            {data.firstName} {data.middleName} {data.lastName}
          </h2>
          <div className="d-md-flex gap-4 align-items-center ">
            <p className="mb-0">Grade: {data.grade}</p>
            <p className="mb-0">Section: {data.section}</p>

            <div className="d-flex align-items-center justify-content-end gap-3">
              <button
                onClick={exportToExcel}
                type="button"
                className="btn btn-success"
              >
                Export to excel
              </button>
              <button
                onClick={handleDeleteAttendance}
                type="button"
                className="btn btn-danger"
              >
                Delete All Records
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="spinner-border " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : attendance.length === 0 ? (
          <div className="alert alert-danger text-center" role="alert">
            No attendance record of {data.firstName} {data.middleName}{" "}
            {data.lastName}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table text-nowrap">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time In</th>
                  <th scope="col">Time Out</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance &&
                  attendance.map((attendance, i) => (
                    <tr key={i} className="table-light">
                      <td>{formatDate(attendance.date)}</td>
                      <td>{formatTime(attendance.timeIn, isTimeIn)}</td>
                      <td>{formatTime(attendance.timeOut, !isTimeIn)}</td>
                      <td
                        className={`${
                          attendance.status === "Present"
                            ? "text-success"
                            : "text-warning"
                        }`}
                      >
                        {attendance.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AttendanceDetails;
