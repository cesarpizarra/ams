import { useTeacherStudent } from '../hooks/useTeacherStudent';
import Loader from '../common/Loader';
import AttendanceTable from '../components/table/AttendanceTable';

const StudentList = () => {
  const { data, isLoading, error } = useTeacherStudent();
  if (isLoading) return <Loader />;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div className="py-4">
      <h1 className="text-center mb-5">Student List</h1>

      {data && <AttendanceTable students={data} />}
    </div>
  );
};

export default StudentList;
