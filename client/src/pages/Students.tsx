import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineSettings } from 'react-icons/md';
import { useFetchStudent } from '../hooks/useFetchStudent';
import Loader from '../common/Loader';
import StudentTable from '../components/table/StudentTable';

const Students = () => {
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
    <div className="py-4">
      <h1 className="text-center mb-5">Students</h1>
      <div className="container d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center w-50 gap-4">
          <h3 className="px-3">Filter</h3>

          <div className="d-flex align-items-center w-50">
            <label htmlFor="level" className="me-2">
              Level:
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

          <div className="d-flex align-items-center w-50">
            <label htmlFor="level">Section:</label>
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

        <Link to="/advance-settings">
          <button type="button" className="btn btn-warning">
            <MdOutlineSettings />
            <span>Advance Settings</span>
          </button>
        </Link>
      </div>
      {data && <StudentTable students={filteredData} />}
    </div>
  );
};

export default Students;
