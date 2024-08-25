import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getStudentAttendance, getStudentByTeacher } from '../services/student';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { FaPrint } from 'react-icons/fa';
import { generatePrintHTML } from '../utils/printUtils';

const StudentList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { students } = await getStudentByTeacher();
        setTimeout(() => {
          setIsLoading(false);
          setData(students);
        }, 1000);
      } catch (error) {
        console.log('Error', error);
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handlePrint = async (lrn) => {
    const student = data.find((student) => student.lrn === lrn);
    if (student) {
      try {
        // Fetch attendance records for the selected student
        const response = await getStudentAttendance(lrn);
        const attendanceRecords = response;

        const htmlContent = generatePrintHTML(student, attendanceRecords);
        const printWindow = window.open('', '', 'height=800,width=1200');
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      } catch (error) {
        console.log('Error fetching attendance for print', error);
      }
    }
  };

  const columns = [
    {
      label: 'LRN No.',
      field: 'lrn',
      width: 150,
    },
    {
      label: 'First Name',
      field: 'firstName',
      width: 270,
    },
    {
      label: 'Middle Name',
      field: 'middleName',
      width: 200,
    },
    {
      label: 'Last Name',
      field: 'lastName',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Grade',
      field: 'grade',
      sort: 'disabled',
      width: 100,
    },
    {
      label: 'Section',
      field: 'section',
      sort: 'disabled',
      width: 100,
    },
    {
      label: 'Action',
      field: 'action',
      sort: 'disabled',
      width: 100,
    },
  ];

  const rows = data.map((student) => ({
    lrn: student.lrn,
    firstName: student.firstName,
    middleName: student.middleName,
    lastName: student.lastName,
    grade: student.grade,
    section: student.section,
    action: (
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={() => handlePrint(student.lrn)}
          title="Print"
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
    ),
  }));
  return (
    <Layout>
      <div className="vh-100 overflow-y-auto py-4">
        <h1 className="text-center mb-5">Student List</h1>
        <div className="table-responsive">
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-around vh-100">
              <div className="spinner-border " role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : data.length === 0 ? (
            <div className="alert alert-danger text-center" role="alert">
              No list of students
            </div>
          ) : (
            <CDBContainer>
              <CDBCard>
                <CDBCardBody>
                  <CDBDataTable
                    striped
                    bordered
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    materialSearch={true}
                    itemsPerPageSelect={true}
                    itemsPerPage={5}
                    responsive
                    data={{ columns, rows }}
                  />
                </CDBCardBody>
              </CDBCard>
            </CDBContainer>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentList;
