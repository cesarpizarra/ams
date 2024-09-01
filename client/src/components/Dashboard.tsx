import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import { getCurrentPhilippineTime } from '../utils/getDate';
import Chart from './chart/Chart';
import { EncryptStorage } from 'encrypt-storage';
import { useFetchStudent } from '../hooks/useFetchStudent';
import Loader from '../common/Loader';
import { useAttendance } from '../hooks/useAttendance';
import { getStudentByTeacher } from '../services/teacherService';
const SECRET = import.meta.env.VITE_LOCAL_KEY;
const encryptStorage = new EncryptStorage(SECRET, {
  storageType: 'localStorage',
});

interface UserData {
  role: 'admin' | 'teacher';
  username?: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [totalStudentFromTeacher, setTotalStudentFromTeacher] = useState(0);
  const {
    data: students,
    isLoading: studentsLoading,
    error: studentsError,
  } = useFetchStudent();
  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    error: attendanceError,
  } = useAttendance(userData?.role || '');

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
    const getStudentLengthFromTeacher = async () => {
      try {
        const response = await getStudentByTeacher();
        setTotalStudentFromTeacher(response.length);
      } catch (error) {
        console.log('Error', error);
      }
    };
    getStudentLengthFromTeacher();
  }, []);

  if (studentsLoading || attendanceLoading) return <Loader />;
  if (studentsError || attendanceError)
    return (
      <p>
        {(studentsError as Error).message || (attendanceError as Error).message}
      </p>
    );

  // const totalAttendanceFromTeacher = attendanceData?.teacher?.timeInCount || 0;
  const totalStudentTimein = attendanceData?.teacher?.timeInCount || 0;
  const totalStudentTimeout = attendanceData?.teacher?.timeOutCount || 0;
  const totalTimein = attendanceData?.admin?.timeInCount || 0;
  const totalTimeout = attendanceData?.admin?.timeOutCount || 0;
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
                <Card.Text>
                  {
                    <CountUp
                      end={Number(totalStudentFromTeacher)}
                      duration={3}
                    />
                  }
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
  );
};

export default Dashboard;
