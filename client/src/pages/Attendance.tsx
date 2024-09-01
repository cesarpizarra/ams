import { useState } from 'react';
import { useFetchStudent } from '../hooks/useFetchStudent';
import Loader from '../common/Loader';
import AttendanceTable from '../components/table/AttendanceTable';

const Attendance = () => {
  const [selectedGrade, setSelectedGrade] = useState('7');
  const [selectedSection, setSelectedSection] = useState('1');
  const { data, isLoading, error } = useFetchStudent();

  const filteredData =
    data?.filter((student) => {
      return (
        (!selectedGrade || student.grade === selectedGrade) &&
        (!selectedSection || student.section === selectedSection)
      );
    }) || [];

  if (isLoading) return <Loader />;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div className="vh-100 py-4">
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

        {data && <AttendanceTable students={filteredData} />}
      </div>
    </div>
  );
};

export default Attendance;
