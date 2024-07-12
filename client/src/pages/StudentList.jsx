import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getStudentByTeacher } from "../services/student";

const StudentList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { students } = await getStudentByTeacher();
        setTimeout(() => {
          setIsLoading(false);
          setData(students);
        }, 1000);
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, []);

  return (
    <Layout>
      <div className="vh-100 overflow-y-auto py-4">
        <h1 className="text-center mb-5">Student List</h1>
        <div className="table-responsive">
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-around vh-100">
              <div className="spinner-border " role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : data.length === 0 ? (
            <div className="alert alert-danger text-center" role="alert">
              No list of students
            </div>
          ) : (
            <table className="table text-nowrap text-center">
              <thead>
                <tr>
                  <th scope="col">LRN No.</th>
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
                      <td>{student.lrn}</td>
                      <td>{student.firstName}</td>
                      <td>{student.middleName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
                      <td className="d-flex align-items-center justify-content-center gap-3">
                        <Link
                          to={`/attendance/${student.firstName}/${student.middleName}/${student.lastName}/${student.grade}/${student.section}/${student._id}`}
                        >
                          <button type="button" className="btn btn-success">
                            View Details
                          </button>
                        </Link>
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
