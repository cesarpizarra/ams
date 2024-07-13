import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getStudentByTeacher } from "../services/student";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from "cdbreact";

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
        console.log("Error", error);
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const columns = [
    {
      label: "LRN No.",
      field: "lrn",
      width: 150,
    },
    {
      label: "First Name",
      field: "firstName",
      width: 270,
    },
    {
      label: "Middle Name",
      field: "middleName",
      width: 200,
    },
    {
      label: "Last Name",
      field: "lastName",
      sort: "asc",
      width: 100,
    },
    {
      label: "Grade",
      field: "grade",
      sort: "disabled",
      width: 100,
    },
    {
      label: "Section",
      field: "section",
      sort: "disabled",
      width: 100,
    },
    {
      label: "Action",
      field: "action",
      sort: "disabled",
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
      <Link
        to={`/attendance/${student.firstName}/${student.middleName}/${student.lastName}/${student.grade}/${student.section}/${student.lrn}/${student._id}`}
        className="btn btn-success"
      >
        View Details
      </Link>
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
            // <table className="table text-nowrap text-center">
            //   <thead>
            //     <tr>
            //       <th scope="col">LRN No.</th>
            //       <th scope="col">First Name</th>
            //       <th scope="col">Middle Name</th>
            //       <th scope="col">Last Name</th>
            //       <th scope="col">Grade</th>
            //       <th scope="col">Section</th>
            //       <th scope="col" id="printPageButton">
            //         Action
            //       </th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {data &&
            //       data.map((student, i) => (
            //         <tr key={i} className="table-light">
            //           <td>{student.lrn}</td>
            //           <td>{student.firstName}</td>
            //           <td>{student.middleName}</td>
            //           <td>{student.lastName}</td>
            //           <td>{student.grade}</td>
            //           <td>{student.section}</td>
            //           <td className="d-flex align-items-center justify-content-center gap-3">
            //             <Link
            //               to={`/attendance/${student.firstName}/${student.middleName}/${student.lastName}/${student.grade}/${student.section}/${student._id}`}
            //             >
            //               <button type="button" className="btn btn-success">
            //                 View Details
            //               </button>
            //             </Link>
            //           </td>
            //         </tr>
            //       ))}
            //   </tbody>
            // </table>

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
