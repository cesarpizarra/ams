import React, { useState } from "react";

const StudentRecords = ({ studentData }) => {
  const [inputTypes, setInputTypes] = useState({
    January: "",
    February: "",
    March: "",
    April: "",
    May: "",
    June: "",
    July: "",
    August: "",
    September: "",
    October: "",
    November: "",
    December: "",
  });

  const handleInputChange = (e, month) => {
    const updatedInputTypes = { ...inputTypes };
    updatedInputTypes[month] = e.target.value;
    setInputTypes(updatedInputTypes);
  };

  return (
    <div>
      <h2>Student Information</h2>
      {studentData && (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{studentData.student.firstName}</td>
              <td>{studentData.student.middleName}</td>
              <td>{studentData.student.lastName}</td>
            </tr>
          </tbody>
        </table>
      )}

      <h2>Attendance Records</h2>
      {studentData && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studentData.attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{new Date(record.timeIn).toLocaleTimeString()}</td>
                <td>{new Date(record.timeOut).toLocaleTimeString()}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Select Input Type for Each Month</h2>
      <div>
        {Object.keys(inputTypes).map((month) => (
          <div key={month}>
            <label>{month}:</label>
            <input
              type="text"
              value={inputTypes[month]}
              onChange={(e) => handleInputChange(e, month)}
            />
          </div>
        ))}
      </div>

      <button className="bg-blue-400 text-white px-2 rounded">
        Save Input Types
      </button>
    </div>
  );
};

export default StudentRecords;
