import React, { useEffect, useState } from "react";
import { getStudentData, updateStudent } from "../services/student";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
const UpdateStudent = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    lrn: "",
    firstName: "",
    middleName: "",
    lastName: "",
    grade: "",
    section: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getStudentData(id);
        setFormData(response);
      } catch (error) {
        console.log("Error", error);
      }
    };

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, formData);
      Swal.fire("Success", "Student updated successfully", "success");
      navigate("/students");
    } catch (error) {
      console.error("Error", error.message);
      setError(error.message);
    }
  };
  return (
    <Layout>
      <div className="container mt-5">
        <Link to="/students" className="btn btn-secondary">
          Back
        </Link>
        <div className="mt-4">
          <h1>Update Student</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="col-form-label">LRN No:</label>
              <input
                placeholder="Enter LRN No."
                type="number"
                className="form-control"
                name="lrn"
                required
                value={formData.lrn}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">First Name:</label>
              <input
                placeholder="Enter First Name"
                type="text"
                className="form-control"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Middle Name:</label>
              <input
                placeholder="Enter Middle Name"
                type="text"
                className="form-control"
                name="middleName"
                required
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="col-form-label">Last Name:</label>
              <input
                placeholder="Enter Last Name"
                type="text"
                className="form-control"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="col-form-label">Grade:</label>
              <select
                className="form-select"
                aria-label="Default select grade"
                name="grade"
                required
                value={formData.grade}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Grade
                </option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="col-form-label">Section:</label>
              <select
                className="form-select"
                aria-label="Default select section"
                name="section"
                required
                value={formData.section}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select section
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            {/* <div className="modal-footer">
          {message ? (
            <div
              className={
                message.includes("successfully")
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          ) : null}
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div> */}

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateStudent;
