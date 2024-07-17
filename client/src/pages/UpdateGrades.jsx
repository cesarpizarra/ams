import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getAllStudents, updateGrades } from "../services/student";
import { Link } from "react-router-dom";

const UpdateGrades = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGrade, setCurrentGrade] = useState("7");
  const [targetGrade, setTargetGrade] = useState("7");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { students } = await getAllStudents();
        setStudents(students);
      } catch (error) {
        console.log("Error fetching students", error);
      }
    };

    fetchStudents();
  }, []);

  const handleGradeUpdate = async () => {
    setIsLoading(true);
    try {
      await updateGrades(currentGrade, targetGrade);
      const { students } = await getAllStudents();
      setTimeout(() => {
        setIsLoading(false);
        setStudents(students);
      }, 1500);
    } catch (error) {
      console.error("Error updating grades:", error);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <Link to="/advance-settings" className="btn btn-secondary">
          Back
        </Link>
        <h1 className="text-center mb-5">Grade Level Update</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Select Grade to Update</h5>

                <div className="mb-3">
                  <label htmlFor="currentGrade" className="form-label">
                    Current Grade:
                  </label>
                  <select
                    id="currentGrade"
                    className="form-select"
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(e.target.value)}
                  >
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="targetGrade" className="form-label">
                    Target Grade:
                  </label>
                  <select
                    id="targetGrade"
                    className="form-select"
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                  >
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGradeUpdate}
                  disabled={
                    isLoading ||
                    students.filter((student) => student.grade === currentGrade)
                      .length === 0
                  }
                >
                  {isLoading ? "Updating..." : "Update Grade"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Optionally, display a list of students here for review */}
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
            Updating...
            <div className="spinner-border " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : students.filter((student) => student.grade === currentGrade)
            .length === 0 ? (
          <div className="py-5">
            <div className="alert alert-danger text-center" role="alert">
              No list of students with the selected grade.
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <h3 className="text-center mb-3">Students to Update</h3>
            <table className="table text-nowrap text-center">
              <thead>
                <tr>
                  <th scope="col">LRN No.</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Middle Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Grade</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((student) => student.grade === currentGrade)
                  .map((student, i) => (
                    <tr key={i} className="table-light">
                      <td>{student.lrn}</td>
                      <td>{student.firstName}</td>
                      <td>{student.middleName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.grade}</td>
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

export default UpdateGrades;
