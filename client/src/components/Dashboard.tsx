import React, { useEffect, useState } from 'react';
import Layout from '../layout/MainLayout';
import {
  getAllAttendance,
  getAllStudents,
  getStudentAttendanceByTeacher,
  getStudentByTeacher,
} from '../services/student';
import { Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import { getCurrentPhilippineTime } from '../utils/getDate';
import Chart from './chart/Chart';
import { EncryptStorage } from 'encrypt-storage';
import { useFetchStudent } from '../hooks/useFetchStudent';
import Loader from '../common/Loader';
const SECRET = import.meta.env.VITE_LOCAL_KEY;
const encryptStorage = new EncryptStorage(SECRET, {
  storageType: 'localStorage',
});

interface UserData {
  role: 'admin' | 'teacher';
  username?: string;
}

const Dashboard = () => {
  const [totalStudentFromTeacher, setTotalStudentFromTeacher] = useState('');
  const [totalTimein, setTotalTimein] = useState(0);
  const [totalStudentTimein, setTotalStudentTimein] = useState(0);
  const [totalStudentTimeout, setTotalStudentTimeout] = useState(0);
  const [totalTimeout, setTotalTimeout] = useState(0);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const { data: students, isLoading, error } = useFetchStudent();
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

  if (isLoading) return <Loader />;
  if (error) return <p>{(error as Error).message}</p>;
  return (
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
                  {<CountUp end={students?.length ?? 0} duration={3} />}
                </Card.Text>
              ) : (
                <Card.Text>{<CountUp end={22} duration={3} />}</Card.Text>
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
  );
};

export default Dashboard;
