import { useQuery } from '@tanstack/react-query';
import { Student } from '../types/user';
import { getStudentByTeacher } from '../services/teacherService';

export function useTeacherStudent() {
  const { data, isLoading, error } = useQuery<Student[]>({
    queryKey: ['teacherStudents'],
    queryFn: getStudentByTeacher,
  });

  return { data, isLoading, error };
}
