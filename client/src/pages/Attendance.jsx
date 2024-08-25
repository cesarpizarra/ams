import React, { useEffect, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAllStudents, getStudentAttendance } from '../services/student';
import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable } from 'cdbreact';
import { generatePrintHTML } from '../utils/printUtils';

const Attendance = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState('7');
  const [selectedSection, setSelectedSection] = useState('1');

  const fetchStudent = async () => {
    try {
      const { students } = await getAllStudents();
      setData(students);
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const filteredData = data.filter((student) => {
    return (
      (!selectedGrade || student.grade === selectedGrade) &&
      (!selectedSection || student.section === selectedSection)
    );
  });

  const handlePrint = async (lrn) => {
    const student = data.find((student) => student.lrn === lrn);
    if (student) {
      try {
        // Fetch attendance records for the selected student
        const response = await getStudentAttendance(lrn);
        const attendanceRecords = response; // Adjust according to your API response

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
    { label: 'LRN No.', field: 'lrn', width: 150 },
    { label: 'First Name', field: 'firstName', width: 270 },
    { label: 'Middle Name', field: 'middleName', width: 200 },
    { label: 'Last Name', sort: 'asc', field: 'lastName', width: 100 },
    { label: 'Grade', sort: 'disabled', field: 'grade', width: 100 },
    { label: 'Section', sort: 'disabled', field: 'section', width: 100 },
    { label: 'Action', sort: 'disabled', field: 'action', width: 100 },
  ];

  const rows = filteredData.map((student) => ({
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
        <h1 className="text-center mb-5">Attendance</h1>
        <div className="table-responsive">
          <div className="container">
            <div className="row align-items-center mb-3">
              <div className="col-md-2">
                <h3 className="px-3">Filter</h3>
              </div>

              <div className="col-md-2 d-flex align-items-center">
                <label htmlFor="level" className="me-2">
                  Level
                </label>
                <select
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="col-md-2 d-flex align-items-center">
                <label htmlFor="section" className="me-2">
                  Section
                </label>
                <select
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="d-flex align-items-center justify-content-around vh-100">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-danger text-center" role="alert">
              No list of students with the selected grade and section.
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
