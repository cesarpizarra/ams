import React, { useEffect, useState } from "react";
import { getStudentData } from "../services/student";

const UpdateStudent = ({ selectedId }) => {
  const [data, setData] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    grade: "",
    section: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getStudentData(selectedId);
        setData(response);
        console.log(response);
      } catch (error) {
        console.log("Error", error);
      }
    };

    getData();
  }, []);
  return (
    <div>
      <div
        className="modal fade"
        id="updateStudent"
        tabIndex="-1"
        aria-labelledby="updateStudentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateStudentModalLabel">
                Update Student
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">First Name:</label>
                  <input
                    placeholder="Enter First Name"
                    type="text"
                    className="form-control"
                    name="firstName"
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
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="col-form-label">Grade:</label>
                  <select
                    className="form-select"
                    aria-label="Default select grade"
                    name="grade"
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
                    required
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
