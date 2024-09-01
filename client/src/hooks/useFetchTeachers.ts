import { useQuery } from '@tanstack/react-query';
import { Teacher } from '../types/user';
import { getAllTeachers } from '../services/student';

export function useFetchTeacher() {
  const { data, isLoading, error } = useQuery<Teacher[]>({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  });

  return { data, isLoading, error };
}
