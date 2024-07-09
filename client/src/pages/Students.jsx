import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllStudents } from "../services/student";
import UpdateStudent from "../modal/UpdateStudent";

const Students = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("7");
  const [selectedSection, setSelectedSection] = useState("1");
  const [selectedId, setSelectedId] = useState("");
  const fetchStudent = async () => {
    try {
      const { students } = await getAllStudents();
      setTimeout(() => {
        setIsLoading(false);
        setData(students);
      }, 1000);
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const filteredData = data.filter((student) => {
    return (
      (!selectedGrade || student.grade === selectedGrade) &&
      (!selectedSection || student.section === selectedSection)
    );
  });
  const handleSelectId = (id) => {
    setSelectedId(id);
  };
  return (
    <Layout>
      {selectedId && <UpdateStudent selectedId={selectedId} />}
      <div className="vh-100 overflow-y-auto py-4">
        <h1 className="text-center mb-5">Students</h1>
        <div className="table-responsive">
          <div className="container">
            <div className="row align-items-center mb-3">
              <div className="col-md-2">
                <h3 className="px-3">Filter</h3>
              </div>

              <div className="col-md-2 d-flex align-items-center">
                <label htmlFor="level" className="me-2">
                  Level
                </label>
                <select
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="col-md-2 d-flex align-items-center">
                <label htmlFor="level" className="me-2">
                  Section
                </label>
                <select
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
          </div>

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
                {filteredData &&
                  filteredData.map((student, i) => (
                    <tr key={i} className="table-light">
                      <td>{student.studentId}</td>
                      <td>{student.firstName}</td>
                      <td>{student.middleName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
                      <td className="d-flex align-items-center justify-content-center gap-3">
                        <button
                          onClick={(e) => handleSelectId(student.studentId)}
                          data-bs-toggle="modal"
                          data-bs-target="#updateStudent"
                          type="button"
                          className="btn btn-success"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                          Edit
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

export default Students;
