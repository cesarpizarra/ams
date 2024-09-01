import Loader from '../common/Loader';
import TeacherTable from '../components/table/TeacherTable';
import { useFetchTeacher } from '../hooks/useFetchTeachers';

const Teachers = () => {
  const { data, isLoading, error } = useFetchTeacher();

  if (isLoading) return <Loader />;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div className="vh-100 overflow-y-auto py-4">
      <h1 className="text-center mb-5">Teachers</h1>
      {data && <TeacherTable teachers={data} />}
    </div>
  );
};

export default Teachers;
