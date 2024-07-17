import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import {
  getAllAttendance,
  getAllStudents,
  getStudentByTeacher,
} from "../services/student";
import { Card } from "react-bootstrap";
import CountUp from "react-countup";
import { getCurrentPhilippineTime } from "../utils/getDate";
import Chart from "./Chart";
const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState("");
  const [totalStudentFromTeacher, setTotalStudentFromTeacher] = useState("");
  const [totalTimein, setTotalTimein] = useState(0);
  const [totalTimeout, setTotalTimeout] = useState(0);

  // Retrieve the username from local storage
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getLength = async () => {
      try {
        const { length } = await getAllStudents();
        setTotalStudents(length);
      } catch (error) {
        console.log("Error", error);
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
      }
    };
    getStudentLengthFromTeacher();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAllAttendance();
        // Get the current date in 'MM/DD/YYYY' format
        const currentDate = new Date().toLocaleDateString("en-US", {
          timeZone: "Asia/Manila",
        });

        const todayTimeInCount = data.filter(
          (record) =>
            new Date(record.timeIn).toLocaleDateString("en-US", {
              timeZone: "Asia/Manila",
            }) === currentDate
        ).length;

        const todayTimeOutCount = data.filter(
          (record) =>
            new Date(record.timeOut).toLocaleDateString("en-US", {
              timeZone: "Asia/Manila",
            }) === currentDate
        ).length;

        setTotalTimein(todayTimeInCount);
        setTotalTimeout(todayTimeOutCount);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchAttendance();
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

        {role === "admin" && (
          <div className="py-5">
            <Chart />
          </div>
        )}
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
                <Card.Text>
                  {<CountUp end={totalTimein} duration={3} />}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>Today's Time Out</Card.Title>
                {<CountUp end={totalTimeout} duration={3} />}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
