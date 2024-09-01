import { useQuery } from '@tanstack/react-query';
import { Student } from '../types/user';
import { getAllStudents } from '../services/student';

export function useFetchStudent() {
  const { data, isLoading, error } = useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: getAllStudents,
  });

  return { data, isLoading, error };
}
