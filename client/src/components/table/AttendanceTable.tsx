import React from 'react';
import { Table } from 'react-bootstrap';
import { Student } from '../../types/user';
import { FaPrint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getStudentAttendance } from '../../services/studentService';
import { generatePrintHTML } from '../../utils/printUtils';
interface TableComponentProps {
  students: Student[];
}

const AttendanceTable: React.FC<TableComponentProps> = ({ students }) => {
  const handlePrint = async (lrn: string) => {
    const student = students?.find((student) => student.lrn === lrn);
    if (student) {
      try {
        // Fetch attendance records for the selected student
        const response = await getStudentAttendance(lrn);
        const attendanceRecords = response;

        const htmlContent = generatePrintHTML(student, attendanceRecords);
        const printWindow = window.open('', '', 'height=800,width=1200');
        printWindow?.document.write(htmlContent);
        printWindow?.document.close();
        printWindow?.focus();
        printWindow?.print();
      } catch (error) {
        console.log('Error fetching attendance for print', error);
      }
    }
  };
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
              <div className="d-flex align-items-center gap-2">
                <button
                  title="Print"
                  onClick={() => handlePrint(student.lrn)}
                  className="bg-primary p-2 rounded text-white btn"
                >
                  <FaPrint />
                </button>

                <Link
                  to={`/attendance/${student.firstName}/${student.middleName}/${student.lastName}/${student.grade}/${student.section}/${student.lrn}/${student._id}`}
                  className="btn btn-success"
                >
                  View
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AttendanceTable;
