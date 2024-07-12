import React, { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const initialFormData = {
    lrn: "",
    firstName: "",
    lastName: "",
    middleName: "",
    grade: "",
    section: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      await axios.post("/student/add", formData, {
        headers: {
          Authorization: token,
        },
      });
      setFormData(initialFormData);
      setMessage("Student added successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response.data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addStudentModal"
        tabIndex="-1"
        aria-labelledby="addStudentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addStudentModalLabel">
                Add New Student
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="col-form-label">LRN No:</label>
                  <input
                    placeholder="Enter LRN No."
                    type="number"
                    className="form-control"
                    name="lrn"
                    value={formData.lrn}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">First Name:</label>
                  <input
                    placeholder="Enter First Name"
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Middle Name:</label>
                  <input
                    placeholder="Enter Middle Name"
                    type="text"
                    className="form-control"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Last Name:</label>
                  <input
                    placeholder="Enter Last Name"
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="col-form-label">Grade:</label>
                  <select
                    className="form-select"
                    aria-label="Default select grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
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
                    value={formData.section}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select section
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div className="modal-footer">
                  {message && (
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
                  )}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
