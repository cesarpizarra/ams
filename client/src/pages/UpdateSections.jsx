import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getAllStudents, updateSection } from "../services/student";
import { Link } from "react-router-dom";

const UpdateSection = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGrade, setCurrentGrade] = useState("7");
  const [targetSection, setTargetSection] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const { students } = await getAllStudents();
      setStudents(students);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching students", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handler for updating sections of selected students
  const handleUpdateSections = async () => {
    setIsLoading(true);

    try {
      // Extract selected studentIds
      const studentIds = selectedStudents.map((student) => student._id);

      // Call updateSection service function
      await updateSection(studentIds, targetSection);

      setTimeout(() => {
        fetchStudents();
        // Reset selected students and loading state
        setSelectedStudents([]);
        setIsLoading(false);
        setTargetSection("1");
      }, 1500);
    } catch (error) {
      console.error("Error updating sections:", error);
      setIsLoading(false);
    }
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (student) => {
    if (selectedStudents.some((selected) => selected._id === student._id)) {
      setSelectedStudents(
        selectedStudents.filter((selected) => selected._id !== student._id)
      );
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  // Function to handle "Select All" checkbox
  const handleSelectAllChange = () => {
    const filteredStudents = students.filter(
      (student) => student.grade === currentGrade
    );
    if (filteredStudents.length === selectedStudents.length) {
      setSelectedStudents([]); // Deselect all
    } else {
      setSelectedStudents(filteredStudents); // Select all
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <Link to="/advance-settings" className="btn btn-secondary">
          Back
        </Link>
        <h1 className="text-center mb-5">Section Update</h1>
        <div className="card-body">
          <h5 className="card-title">Select Grade to Update</h5>
          <div className="mb-3">
            <select
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
            <h5 className="card-title">Select Section to Update</h5>
            <div className="mb-3">
              <select
                className="form-select"
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Optionally, display a list of students here for review */}
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
            <div className="spinner-border " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : students.filter((student) => student.grade === currentGrade)
            .length === 0 ? (
          <div className="py-5">
            <div className="alert alert-danger text-center" role="alert">
              No list of students with the selected grade and section.
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <h3 className="text-center mb-3">Students to Update</h3>
            <div className="d-flex justify-content-end mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleUpdateSections}
                disabled={selectedStudents.length === 0}
              >
                {isLoading ? "Updating..." : "Update Section"}
              </button>
            </div>
            <table className="table text-nowrap text-center">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      checked={
                        students.filter(
                          (student) => student.grade === currentGrade
                        ).length === selectedStudents.length
                      }
                      onChange={handleSelectAllChange}
                    />
                    <span>Select All</span>
                  </th>
                  <th scope="col">LRN No.</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Middle Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Section</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((student) => student.grade === currentGrade)
                  .map((student, i) => (
                    <tr key={i} className="table-light">
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.some(
                            (selected) => selected._id === student._id
                          )}
                          onChange={() => handleCheckboxChange(student)}
                        />
                      </td>
                      <td>{student.lrn}</td>
                      <td>{student.firstName}</td>
                      <td>{student.middleName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
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

export default UpdateSection;
