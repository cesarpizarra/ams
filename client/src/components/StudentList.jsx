import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudent from "./AddStudent";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import StudentDetails from "./StudentDetails";

const StudentList = ({ token, grade, section }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // Define selectedStudent state

  const grades = [7, 8, 9, 10, 11, 12];
  const sections = [1, 2];

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/student/${grade}/${section}/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setStudents(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch students error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token, grade, section]);

  const toggleAddStudentModal = () => {
    setIsAddStudentModalOpen(!isAddStudentModalOpen);
  };

  const handleEditInputChange = (e, field) => {
    const { value } = e.target;
    setEditingStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
  };

  const closeEditModal = () => {
    setEditingStudent(null);
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto p-6">
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
            <AddStudent
              token={token}
              grade={grade}
              section={section}
              onStudentAdded={() => {
                toggleAddStudentModal();
                fetchStudents();
                setIsSuccessModalOpen(true);
              }}
              setIsAddStudentModalOpen={setIsAddStudentModalOpen}
            />
          </div>
        </div>
      )}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Success!</h2>
            <p className="text-green-600">Student added successfully.</p>
          </div>
        </div>
      )}
      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">List of Students</h2>
        <button
          onClick={toggleAddStudentModal}
          className="bg-green-500 text-white px-2 py-1 rounded mb-2"
        >
          Add Student
        </button>
      </div>
      <table className="table-auto w-full">
        <thead className=" text-left">
          <tr>
            <th className="py-2">First Name</th>
            <th className="py-2">Middle Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Grade</th>
            <th className="py-2">Section</th>
            <th className="py-2">Actions</th>
            <th className="py-2">View</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="py-2">{student.firstName}</td>
              <td className="py-2">{student.middleName}</td>
              <td className="py-2">{student.lastName}</td>
              <td className="py-2">{student.grade}</td>
              <td className="py-2">{student.section}</td>
              <td className="py-2">
                <button
                  onClick={() => openEditModal(student)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(student._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => viewStudentDetails(student)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={editingStudent.firstName}
              onChange={(e) => handleEditInputChange(e, "firstName")}
              className="border rounded px-2 py-1 mb-2"
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={editingStudent.middleName}
              onChange={(e) => handleEditInputChange(e, "middleName")}
              className="border rounded px-2 py-1 mb-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={editingStudent.lastName}
              onChange={(e) => handleEditInputChange(e, "lastName")}
              className="border rounded px-2 py-1 mb-2"
            />
            <select
              name="grade"
              value={editingStudent.grade}
              onChange={(e) => handleEditInputChange(e, "grade")}
              className="border rounded px-2 py-1 mb-2"
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
            <select
              name="section"
              value={editingStudent.section}
              onChange={(e) => handleEditInputChange(e, "section")}
              className="border rounded px-2 py-1 mb-2"
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </select>
            <button
              onClick={updateStudent}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={closeEditModal}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
