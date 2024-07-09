import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllUsers } from "../services/student";

const Teachers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeacher = async () => {
    try {
      const response = await getAllUsers();
      setTimeout(() => {
        setIsLoading(false);
        setData(response.filter((data) => data.role === "teacher"));
      }, 1000);
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <Layout>
      <div className="vh-100 overflow-y-auto py-4">
        <h1 className="text-center mb-5">Teachers</h1>
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
            <table className="table text-nowrap text-center text-capitalize">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Role</th>
                  <th scope="col">Advisory Level</th>
                  <th scope="col">Section</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((teacher, i) => (
                    <tr key={i} className="table-light">
                      <td>{teacher.username}</td>
                      <td>{teacher.role}</td>
                      <td>{teacher.grade}</td>
                      <td>{teacher.section}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Teachers;
