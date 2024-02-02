import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Swal from "sweetalert2";

const StudentList = () => {
  const [data, setData] = useState([]);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/student/students", {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data.students);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleDeleteStudent = async (studentId) => {
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
        await axios.delete(`/student/${studentId}`, {
          headers: {
            Authorization: token,
          },
        });
        // After deleting the student, re-fetch the updated list
        fetchStudent();
        Swal.fire("Deleted!", "Student has been deleted.", "success");
      }
    } catch (error) {
      console.log("Error", error);
      Swal.fire("Error", "Failed to delete student.", "error");
    }
  };

  return (
    <Layout>
      <div>
        <div className="table-responsive">
          {data.length === 0 ? (
            <div className="alert alert-danger text-center" role="alert">
              No list of students
            </div>
          ) : (
            <table className="table text-nowrap text-center">
              <thead>
                <tr>
                  <th scope="col">Student Id</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Middle Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Section</th>
                  <th scope="col" id="printPageButton">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((student, i) => (
                    <tr key={i} className="table-light">
                      <td>{student.studentId}</td>
                      <td>{student.firstName}</td>
                      <td>{student.middleName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
                      <td className="d-flex align-items-center justify-content-center gap-3">
                        <Link to={`/attendance/${student.studentId}`}>
                          <button type="button" className="btn btn-success">
                            View Details
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDeleteStudent(student.studentId)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Remove Student
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentList;
