import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getAllStudents, getStudentByTeacher } from "../services/student";
import { Card } from "react-bootstrap";
import CountUp from "react-countup";
import { getCurrentPhilippineTime } from "../utils/getDate";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState("");
  const [totalStudentFromTeacher, setTotalStudentFromTeacher] = useState("");
  // Retrieve the username from local storage
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const fetchStudent = async () => {
    try {
      const response = await getStudentByTeacher();
      setTimeout(() => {
        setIsLoading(false);
        setData(response);
      }, 1000);
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  useEffect(() => {
    const getLength = async () => {
      try {
        const { length } = await getAllStudents();
        setTotalStudents(length);
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    };
    getLength();
  }, []);

  useEffect(() => {
    const getStudentLengthFromTeacher = async () => {
      try {
        const { length } = await getStudentByTeacher();
        setTotalStudentFromTeacher(length);
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
      }
    };
    getStudentLengthFromTeacher();
  }, []);
  return (
    <Layout>
      <div className="container mt-5">
        <div className="d-md-flex align-items-center justify-content-between">
          <h1>
            {username && (
              <span className="text-capitalize">Welcome {username}!</span>
            )}
          </h1>

          <p className="">{getCurrentPhilippineTime()}</p>
        </div>
        <div className="row mb-4">
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>Total Students</Card.Title>
                {role === "admin" ? (
                  <Card.Text>
                    {<CountUp end={totalStudents} duration={3} />}
                  </Card.Text>
                ) : (
                  <Card.Text>
                    {<CountUp end={totalStudentFromTeacher} duration={3} />}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>Today's Time In</Card.Title>
                <Card.Text>0</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>Today's Time Out</Card.Title>
                <Card.Text>0</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
