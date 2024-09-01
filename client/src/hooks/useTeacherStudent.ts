import { useQuery } from '@tanstack/react-query';
import { Student, Teacher } from '../types/user';
import { getStudentByTeacher } from '../services/student';

export function useTeacherStudent() {
  const { data, isLoading, error } = useQuery<Student[]>({
    queryKey: ['teacherStudents'],
    queryFn: getStudentByTeacher,
  });

  return { data, isLoading, error };
}
