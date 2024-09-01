import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import { useFetchStudent } from '../hooks/useFetchStudent';
import { Table } from 'react-bootstrap';
import { useUpdateGrade } from '../hooks/useUpdateGrade';
import { toast } from 'sonner';

const UpdateGrades = () => {
  const [currentGrade, setCurrentGrade] = useState('7');
  const [targetGrade, setTargetGrade] = useState('7');
  const { data, isLoading, error } = useFetchStudent();
  const mutation = useUpdateGrade();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate(
      { currentGrade, targetGrade },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message);
        },
      }
    );
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
          <h1 className="text-center fs-5">Grade Level Update</h1>
        </div>

        <div className="d-flex align-items-center gap-5 mb-4">
          <h5>Select Grade to Update</h5>

          <div>
            <label htmlFor="currentGrade" className="form-label">
              Current Grade:
            </label>
            <select
              id="currentGrade"
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

          <div>
            <label htmlFor="targetGrade" className="form-label">
              Target Grade:
            </label>
            <select
              id="targetGrade"
              className="form-select"
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value)}
            >
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary mt-4"
            disabled={isLoading || currentGrade === targetGrade}
          >
            {isLoading ? 'Updating...' : 'Update Grade'}
          </button>
        </div>
      </div>

      {data &&
      data?.filter((student) => student.grade === currentGrade).length === 0 ? (
        <div className="py-5">
          <div className="alert alert-danger text-center" role="alert">
            No list of students with the selected grade.
          </div>
        </div>
      ) : (
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>LRN NUMBER</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Grade</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                ?.filter((student) => student.grade === currentGrade)
                .map((student, index) => (
                  <tr key={index}>
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
      )}
    </div>
  );
};

export default UpdateGrades;
