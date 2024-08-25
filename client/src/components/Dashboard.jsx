import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import {
  getAllAttendance,
  getAllStudents,
  getStudentAttendanceByTeacher,
  getStudentByTeacher,
} from '../services/student';
import { Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import { getCurrentPhilippineTime } from '../utils/getDate';
import Chart from './Chart';
import { EncryptStorage } from 'encrypt-storage';
const SECRET = import.meta.env.VITE_LOCAL_KEY;
const encryptStorage = new EncryptStorage(SECRET, {
  storageType: 'localStorage',
});
const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState('');
  const [totalStudentFromTeacher, setTotalStudentFromTeacher] = useState('');
  const [totalTimein, setTotalTimein] = useState(0);
  const [totalStudentTimein, setTotalStudentTimein] = useState(0);
  const [totalStudentTimeout, setTotalStudentTimeout] = useState(0);
  const [totalTimeout, setTotalTimeout] = useState(0);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Retrieve data from localStorage
    const data = encryptStorage.getItem('ascs');
    if (data) {
      setUserData(data);
    } else {
      console.log('No data found in storage');
    }
  }, []);

  useEffect(() => {
    const getLength = async () => {
      try {
        const { length } = await getAllStudents();
        setTotalStudents(length);
      } catch (error) {
        console.log('Error', error);
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
        console.log('Error', error);
      }
    };
    getStudentLengthFromTeacher();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAllAttendance();
        // Get the current date in 'MM/DD/YYYY' format
        const currentDate = new Date().toLocaleDateString('en-US', {
          timeZone: 'Asia/Manila',
        });

        const todayTimeInCount = data.filter(
          (record) =>
            new Date(record.timeIn).toLocaleDateString('en-US', {
              timeZone: 'Asia/Manila',
            }) === currentDate
        ).length;

        const todayTimeOutCount = data.filter(
          (record) =>
            new Date(record.timeOut).toLocaleDateString('en-US', {
              timeZone: 'Asia/Manila',
            }) === currentDate
        ).length;

        setTotalTimein(todayTimeInCount);
        setTotalTimeout(todayTimeOutCount);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchAttendance();
  }, []);

  useEffect(() => {
    const getTotalAttendanceTeacher = async () => {
      try {
        const data = await getStudentAttendanceByTeacher();
        // Get the current date in 'MM/DD/YYYY' format
        const currentDate = new Date().toLocaleDateString('en-US', {
          timeZone: 'Asia/Manila',
        });

        const todayTimeInCount = data.filter(
          (record) =>
            new Date(record.timeIn).toLocaleDateString('en-US', {
              timeZone: 'Asia/Manila',
            }) === currentDate
        ).length;

        const todayTimeOutCount = data.filter(
          (record) =>
            new Date(record.timeOut).toLocaleDateString('en-US', {
              timeZone: 'Asia/Manila',
            }) === currentDate
        ).length;

        setTotalStudentTimein(todayTimeInCount);
        setTotalStudentTimeout(todayTimeOutCount);
      } catch (error) {
        console.log('Error', error);
      }
    };
    getTotalAttendanceTeacher();
  }, []);
  return (
    <Layout>
      <div className="container mt-5">
        <div className="d-md-flex align-items-center justify-content-between">
          <h1>
            {userData && (
              <span className="text-capitalize">
                Welcome {userData.username}!
              </span>
            )}
          </h1>

          <p className="">{getCurrentPhilippineTime()}</p>
        </div>

        {userData && userData.role === 'admin' && (
          <div className="py-5">
            <Chart />
          </div>
        )}
        <div className="row mb-4">
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>Total Students</Card.Title>
                {userData && userData.role === 'admin' ? (
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
                {userData && userData.role === 'admin' ? (
                  <Card.Text>
                    {<CountUp end={totalTimein} duration={2} />}
                  </Card.Text>
                ) : (
                  <Card.Text>
                    {<CountUp end={totalStudentTimein} duration={2} />}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>Today's Time Out</Card.Title>
                {userData && userData.role === 'admin' ? (
                  <Card.Text>
                    {<CountUp end={totalTimeout} duration={2} />}
                  </Card.Text>
                ) : (
                  <Card.Text>
                    {<CountUp end={totalStudentTimeout} duration={2} />}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
