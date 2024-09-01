import React from 'react';
import { Table } from 'react-bootstrap';
import { Teacher } from '../../types/user';

interface TableComponentProps {
  teachers: Teacher[];
}

const TeacherTable: React.FC<TableComponentProps> = ({ teachers }) => {
  return (
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Advisory Level</th>
          <th>Section</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((student, index) => (
          <tr key={index}>
            <td>{student.username}</td>
            <td>{student.role}</td>
            <td>{student.grade}</td>
            <td>{student.section}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeacherTable;
