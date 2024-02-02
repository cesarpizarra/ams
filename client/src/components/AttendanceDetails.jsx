import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const AttendanceDetails = () => {
  const { studentId } = useParams();
  const [data, setData] = useState("");
  const [attendance, setAttendance] = useState([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/student/${studentId}`, {
        headers: {
          Authorization: token,
        },
      });

      setData(response.data.student);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`/api/attendance/student/${studentId}`, {
        headers: {
          Authorization: token,
        },
      });
      setAttendance(response.data.attendanceRecords);
    } catch (error) {
      console.log("Error fetch attendance", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString, isTimeIn) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    // Check if it's time in or time out based on the availability of timeString
    if (!timeString && isTimeIn) {
      return "No Time Out";
    } else if (!timeString && !isTimeIn) {
      return "No Time In";
    }

    // If timeString is available, format and return the time
    return new Date(timeString).toLocaleTimeString("en-US", options);
  };

  const isTimeIn = !!attendance.timeIn;

  const handleDeleteAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

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
        await axios.delete(`/api/attendance/delete/${studentId}`, {
          headers: {
            Authorization: token,
          },
        });
        fetchAttendance();
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid">
        <Link to="/students">
          <button className="btn btn-secondary mt-4">Back</button>
        </Link>
        <div className="d-md-flex align-items-center justify-content-between mt-3">
          <h2>
            {data.firstName} {data.middleName} {data.lastName}
          </h2>
          <div className="d-flex gap-4">
            <p>Grade: {data.grade}</p>
            <p>Section: {data.section}</p>
          </div>
        </div>

        {attendance.length === 0 ? (
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
                      <td>{attendance.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="d-flex align-items-center justify-content-end gap-3">
              <button type="button" className="btn btn-success">
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
        )}
      </div>
    </Layout>
  );
};

export default AttendanceDetails;
