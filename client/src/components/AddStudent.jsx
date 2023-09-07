import React, { useState } from "react";
import axios from "axios";

const AddStudent = ({ token, grade, section, onStudentAdded }) => {
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    grade: "",
    section: "",
  });

  const grades = [7, 8, 9, 10, 11, 12];
  const sections = [1, 2];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const addStudent = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/student/${grade}/${section}/add`,
        newStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Student added successfully, clear the input fields
        setNewStudent({
          firstName: "",
          middleName: "",
          lastName: "",
          grade: "",
          section: "",
        });

        // Notify the parent component that a new student was added
        if (onStudentAdded) {
          onStudentAdded();
        }
      }
    } catch (error) {
      console.error("Add student error:", error);
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <div className="w-1/3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="w-1/3">
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={newStudent.middleName}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="w-1/3">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="w-1/3">
          <select
            name="grade"
            value={newStudent.grade}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <select
            name="section"
            value={newStudent.section}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                Section {section}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <button
            onClick={addStudent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
