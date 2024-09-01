import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUpdateSection } from '../hooks/useUpdateSection';
import Loader from '../common/Loader';
import { toast } from 'sonner';
import { Student } from '../types/user';
import { useFetchStudent } from '../hooks/useFetchStudent';
import { Table } from 'react-bootstrap';

const UpdateSection = () => {
  const [currentGrade, setCurrentGrade] = useState('7');
  const [targetSection, setTargetSection] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Student[] | any>([]);
  const { data, isLoading, error } = useFetchStudent();
  const mutation = useUpdateSection();

  const handleUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const studentIds: any = selectedStudents?.map(
      (student: any) => student._id
    );
    mutation.mutate(
      { studentIds, targetSection },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'An error occurred');
        },
      }
    );
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (student: any) => {
    if (
      selectedStudents.some((selected: any) => selected._id === student._id)
    ) {
      setSelectedStudents(
        selectedStudents.filter((selected: any) => selected._id !== student._id)
      );
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  // Function to handle "Select All" checkbox
  const handleSelectAllChange = () => {
    const filteredStudents = data?.filter(
      (student) => student.grade === currentGrade
    );
    if (filteredStudents?.length === selectedStudents.length) {
      setSelectedStudents([]); // Deselect all
    } else {
      setSelectedStudents(filteredStudents);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{(error as Error).message}</p>;
  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-4">
          <Link to="/advance-settings" className="btn btn-secondary">
            Back
          </Link>
          <h1 className="text-center fs-5">Section Update</h1>
        </div>

        <div className="d-flex align-items-center gap-5 mb-4">
          <h5 className="fs-6">Select Grade to Update</h5>
          <div>
            <select
              className="form-select"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(e.target.value)}
            >
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <h5 className="fs-6">Select Section to Update</h5>

          <div>
            <div>
              <select
                className="form-select"
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {data &&
      data.filter((student: Student) => student.grade === currentGrade)
        .length === 0 ? (
        <div className="py-5">
          <div className="alert alert-danger text-center" role="alert">
            No list of students with the selected grade and section.
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="d-flex justify-content-end mb-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleUpdate}
              disabled={selectedStudents?.length === 0}
            >
              {isLoading ? 'Updating...' : 'Update Section'}
            </button>
          </div>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    checked={
                      data?.filter(
                        (student: Student) => student.grade === currentGrade
                      ).length === selectedStudents?.length
                    }
                    onChange={handleSelectAllChange}
                  />
                  <span>Select All</span>
                </th>
                <th scope="col">LRN No.</th>
                <th scope="col">First Name</th>
                <th scope="col">Middle Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Grade</th>
                <th scope="col">Section</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  .filter((student: any) => student.grade === currentGrade)
                  .map((student: Student, i) => (
                    <tr key={i} className="table-light">
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents?.some(
                            (selected: any) => selected._id === student._id
                          )}
                          onChange={() => handleCheckboxChange(student)}
                        />
                      </td>
                      <td>{student.lrn}</td>
                      <td>{student.firstName}</td>
                      <td>{student.middleName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.grade}</td>
                      <td>{student.section}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UpdateSection;
