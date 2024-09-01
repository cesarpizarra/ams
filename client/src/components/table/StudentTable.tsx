import React from 'react';
import { Table } from 'react-bootstrap';
import { Student } from '../../types/user';
import { Link } from 'react-router-dom';

interface TableComponentProps {
  students: Student[];
}

const StudentTable: React.FC<TableComponentProps> = ({ students }) => {
  return (
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>LRN NUMBER</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Grade</th>
          <th>Section</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.lrn}</td>
            <td>{student.firstName}</td>
            <td>{student.middleName}</td>
            <td>{student.lastName}</td>
            <td>{student.grade}</td>
            <td>{student.section}</td>
            <td>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Link
                  to={`/update-student/${student._id}`}
                  className="bg-success text-white text-decoration-none px-3 rounded py-1"
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
                </Link>

                <button className="btn btn-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="16"
                    fill="currentColor"
                    width="16"
                  >
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentTable;
